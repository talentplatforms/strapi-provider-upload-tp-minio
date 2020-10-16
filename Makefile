yalc:
	yalc publish --push

# patches a version
patch:
	npm run release:patch
	git push
	npm publish

# minor up
minor:
	npm run release:minor
	git push
	npm publish

# major up
release:
	npm run release
	git push
	npm publish
