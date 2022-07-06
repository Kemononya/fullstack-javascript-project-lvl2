install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff -h

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch