# app/core/exception_handler.py
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.schemas.response import ApiResponse

def init_exception_handlers(app):
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=422,
            content=ApiResponse(
                data=None,
                message="Validation error",
                status_code=422
            ).dict()
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content=ApiResponse(
                data=None,
                message=str(exc),
                status_code=500
            ).dict()
        )
