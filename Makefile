.PHONY: start test test-watch test-coverage

start:
	cd src/main/webapp && npx -y http-server -p 18080

test:
	npm test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage
