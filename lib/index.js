'use strict';

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Public node modules.
const Minio = require('minio');

const DOWNLOAD_FILE_EXTS = ['.pdf', '.docx', '.doc', '.xls', '.xlsx']

module.exports = {
  init: ({
    endPoint,
    bucket,
    port,
    accessKey,
    secretKey,
    useSSL,
    folder,
    isDocker,
    host,
    overridePath,
    fileOverridePath,
    ..._options
  }) => {
    const MINIO = new Minio.Client({
      port: parseInt(port, 10),
      useSSL: false,
      endPoint,
      accessKey,
      secretKey,
    });

    return {
      upload: file => {
        return new Promise((resolve, reject) => {
          // upload file to a bucket
          const pathChunk = file.path ? `${file.path}/` : '';
          const path = `${folder}/${pathChunk}`;

          MINIO.putObject(
            bucket,
            `${path}${file.hash}${file.ext}`,
            Buffer.from(file.buffer, 'binary'),
            {
              'Content-Type': file.mime,
            },
            (err, _etag) => {
              if (err) {
                return reject(err);
              }

              const filePath = `${bucket}/${path}${file.hash}${file.ext}`;
              let hostPart = `${MINIO.protocol}//${MINIO.host}:${MINIO.port}`;

              if (isDocker) {
                const http = useSSL ? 'https' : 'http';
                hostPart = `${http}://${host}`;
              }

              file.url = `${hostPart}/${filePath}`;

              if (fileOverridePath && DOWNLOAD_FILE_EXTS.includes(file.ext)) {
                file.url = `${fileOverridePath}/${file.hash}${file.ext}`;
              } else if (overridePath) {
                file.url = `${overridePath}/${file.hash}${file.ext}`;
              }

              resolve();
            }
          );
        });
      },

      delete: file => {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          const pathChunk = file.path ? `${file.path}/` : '';
          const path = `${folder}/${pathChunk}`;

          MINIO.removeObject(bucket, `${path}${file.hash}${file.ext}`, err => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      },
    };
  },
};
