from fastapi import APIRouter
from . import auth,plan,payment

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(plan.router)
api_router.include_router(payment.router)