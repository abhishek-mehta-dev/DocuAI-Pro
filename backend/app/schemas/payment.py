from pydantic import BaseModel
from typing import Optional

class PaymentCreate(BaseModel):
    user_id: int
    plan_id: int
    subscription_id: Optional[int] = None
    currency: str = "USD"
    amount: float

class PaymentRead(BaseModel):
    id: int
    user_id: int
    plan_id: int
    amount: float
    currency: str
    status: str

    class Config:
        from_attributes = True
