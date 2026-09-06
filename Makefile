# ANVESH Monorepo Automation Commands

.PHONY: help infra-up infra-down setup test-backend test-ml lint format

help:
	@echo "ANVESH Development Automation Commands:"
	@echo "  make infra-up      - Launch PostgreSQL, Qdrant, Redis, and MLflow containers"
	@echo "  make infra-down    - Tear down infrastructure containers"
	@echo "  make setup         - Setup local environment dependencies"
	@echo "  make test-backend  - Run backend unit and integration tests"
	@echo "  make test-ml       - Run ML pipeline and ranking evaluations"
	@echo "  make lint          - Run linters across python and frontend packages"
	@echo "  make format        - Format codebase with black and isort"

infra-up:
	docker compose up -d

infra-down:
	docker compose down

setup:
	pip install -r requirements.txt
	cd frontend && npm install

test-backend:
	pytest backend/tests/ -v

test-ml:
	pytest ml/ -v

lint:
	flake8 backend ml ingestion
	black --check backend ml ingestion

format:
	black backend ml ingestion
	isort backend ml ingestion
