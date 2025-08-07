from typing import Any, Optional
from pydantic import BaseModel

class ApiResponse(BaseModel):
    data: Optional[Any]
    message: str
    status_code: int
    pagination: Optional[dict] = None
