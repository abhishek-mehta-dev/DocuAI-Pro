from fastapi import FastAPI
from sqlmodel import Session
from sqlalchemy import text
from .utils.response_helpers import success_response

from app.db.session import engine
from app.api.routes import api_router
from app.core.exception_handler import init_exception_handlers
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings


app = FastAPI(
    title="My API",
    version="1.0.0"
)

origins = [
    settings.FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def test_db_connection():
    try:
        with Session(engine) as session:
            session.exec(text("SELECT 1"))
        print("[ Connected to database! ]")
    except Exception as e:
        print("[ DB connection failed: ]", e)

# Register global error handlers
init_exception_handlers(app)

# Register API routers
app.include_router(api_router,prefix='/api')

def read_root():
    return success_response(
        data={"greeting": "Hello, World!"},
        message="Root endpoint reached"
    )