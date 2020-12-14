[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
host# strapi-provider-upload-tp-minio

This upload provider uses the [JavaScript Minio.Client](https://docs.min.io/docs/javascript-client-api-reference.html) to upload files to a (self hosted) instance of [Minio](https://min.io/).

It's compatible with the the strapi 3.1.1.

**Notice**
We currently use it in conjunction with Docker.

## Config

There are only a couple of settings one has to provide to make it work.
The following config settings are available:

| Config Label        | Internal Name | Value                                         |
| ------------------- | ------------- | --------------------------------------------- |
| Access API Token    | accessKey     | string                                        |
| Secret Access Token | secretKey     | string                                        |
| Bucket              | bucket        | string                                        |
| Endpoint            | endPoint      | string                                        |
| Port                | port          | string                                        |
| SSL                 | useSSL        | string(true for ssl, anything else for false) |
| Folder              | folder        | string                                        |
| isDocker            | isDocker      | bool                                          |
| Host                | host          | string                                        |
| overridePath        | overridePath  | string (overrides host settings)              |

The thing with the overridePath is, that it enables you to set a proxied image url, so that you can output the images through some kind of image proxy (eg. thumbor or imgproxy).

## Example Hash

The resulting configuration file should look like this:

```javascript
// File: ./config/plugins.js

module.exports = ({ env }) => ({
  upload: {
    provider: 'tp-minio',
    providerOptions: {
      accessKey: env('MINIO_ACCESS_KEY'),
      secretKey: env('MINIO_SECRET_KEY'),
      bucket: env('MINIO_BUCKET'),
      endPoint: env('MINIO_ENDPOINT'),
      port: parseInt(env('MINIO_PORT'), 10) || 9000,
      useSSL: env('MINIO_USE_SSL') === 'true',
      folder: 'cms',
      isDocker: true,
      host: env('MINIO_HOST'),
    },
  },
});
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
