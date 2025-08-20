from sqlmodel import SQLModel, Field, Column, JSON
from typing import Optional
from datetime import datetime

class Payment(SQLModel, table=True):
    __tablename__ = "payments"

    id: Optional[int] = Field(default=None, primary_key=True)

    user_id: int = Field(index=True, foreign_key="users.id")            
    subscription_id: Optional[int] = Field(default=None, foreign_key="subscriptions.id")  
    plan_id: int = Field(index=True, foreign_key="plans.id")           

    provider: str = Field(default="paypal")
    provider_payment_id: Optional[str] = None
    provider_payer_id: Optional[str] = None

    amount: float
    currency: str = Field(default="USD")

    status: str = Field(default="PENDING")
    payment_method: Optional[str] = None
    raw_response: Optional[dict] = Field(default=None, sa_column=Column(JSON))

    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
