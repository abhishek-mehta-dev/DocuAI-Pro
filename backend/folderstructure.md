project-root/
│
├── backend/ # FastAPI backend
│ ├── app/
│ │ ├── api/ # API routes
│ │ │ ├── v1/ # Versioned API
│ │ │ │ ├── routes/ # Route groups (users, auth, etc.)
│ │ │ │ │ ├── user.py
│ │ │ │ │ └── **init**.py
│ │ │ │ └── **init**.py
│ │ │ └── **init**.py
│ │ │
│ │ ├── core/ # Core configs
│ │ │ ├── config.py # Env vars (pydantic-settings)
│ │ │ ├── security.py # JWT / password hashing (optional)
│ │ │ └── logging.py # Logging config
│ │ │
│ │ ├── db/ # Database setup
│ │ │ ├── base.py # Import all models for Alembic
│ │ │ ├── session.py # SQLModel engine/session
│ │ │ └── models/ # SQLModel models
│ │ │ ├── user.py
│ │ │ └── **init**.py
│ │ │
│ │ ├── schemas/ # Extra Pydantic schemas if needed
│ │ │ ├── user.py
│ │ │ └── **init**.py
│ │ │
│ │ ├── services/ # Business logic layer
│ │ │ ├── user_service.py
│ │ │ └── **init**.py
│ │ │
│ │ ├── utils/ # Helpers
│ │ │ └── **init**.py
│ │ │
│ │ ├── dependencies.py # Common FastAPI dependencies
│ │ └── main.py # FastAPI entrypoint
│ │
│ ├── alembic/ # Alembic migrations
│ ├── tests/ # Unit/integration tests
│ │ ├── conftest.py
│ │ └── test_users.py
│ ├── requirements.txt
│ ├── gunicorn_conf.py # Gunicorn config (for Uvicorn workers)
│ └── Dockerfile
│
├── frontend/ # Next.js frontend
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/ # Next.js pages
│ │ ├── hooks/
│ │ ├── services/ # API calls to backend
│ │ ├── utils/
│ │ └── styles/
│ ├── .env
│ ├── package.json
│ └── next.config.js
│
├── docker-compose.yml # Run backend + frontend + DB
├── .env # Shared env vars
├── README.md
└── .gitignore
