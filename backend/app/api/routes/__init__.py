from fastapi import APIRouter
from . import auth,plan,payment,document

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(plan.router)
api_router.include_router(payment.router)
api_router.include_router(document.router)