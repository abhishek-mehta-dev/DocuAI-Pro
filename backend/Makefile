# Variables
APP=app.main:app
HOST=0.0.0.0
PORT=9000
PYTHON=.venv/bin/python
UVICORN=.venv/bin/uvicorn
ALEMBIC=.venv/bin/alembic
PYTEST=.venv/bin/pytest

# Development server (auto-reload)
dev:
	$(UVICORN) $(APP) --reload --host $(HOST) --port $(PORT)

# Production server (no auto-reload)
start:
	$(UVICORN) $(APP) --host $(HOST) --port $(PORT)

# Alembic database migrations
alembic-upgrade:
	$(ALEMBIC) upgrade head

alembic-revision:
	$(ALEMBIC) revision --autogenerate -m "$(msg)"

# Run tests
test:
	$(PYTEST) -v --maxfail=1 --disable-warnings -q

# Seed plans into database
seed-plans:
	$(PYTHON) -m app.seeders.seed_plans
