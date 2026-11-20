.PHONY: install dev build preview check clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview: build
	npm run preview

check:
	npm run reference
	npx astro check
	npm run check:typescript

clean:
	rm -rf dist .astro
