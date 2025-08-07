from fastapi.responses import JSONResponse
from app.schemas.response import ApiResponse

def success_response(
    data,
    message: str,
    status_code: int = 200,
    pagination: dict = None
):
    return JSONResponse(
        status_code=status_code,
        content=ApiResponse(
            data=data,
            message=message,
            status_code=status_code,
            pagination=pagination
        ).dict()
    )
