install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff -h

lint:
	npx eslint .
