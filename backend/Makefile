# Variables
APP=app.main:app
HOST=0.0.0.0
PORT=9000

# Development server (auto-reload)
dev:
	uvicorn $(APP) --reload --host $(HOST) --port $(PORT)

# Production server (no auto-reload)
start:
	uvicorn $(APP) --host $(HOST) --port $(PORT)

# Alembic database migrations
alembic-upgrade:
	alembic upgrade head

alembic-revision:
	alembic revision --autogenerate -m "$(msg)"

# Run tests
test:
	pytest -v --maxfail=1 --disable-warnings -q
