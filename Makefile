yalc:
	yalc publish --push

# patches a version
patch:
	npm run release:patch
	git push

# minor up
minor:
	npm run release:minor
	git push

# major up
release:
	npm run release
	git push
