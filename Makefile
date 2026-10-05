.PHONY: help install dev build start lint

help:
	@echo "Available commands:"
	@echo "  make install   Install npm dependencies"
	@echo "  make dev       Start the Next.js dev server"
	@echo "  make build     Create a production build"
	@echo "  make start     Start the production server"
	@echo "  make lint      Run ESLint"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint
