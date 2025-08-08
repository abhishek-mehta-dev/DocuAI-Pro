from sqlmodel import SQLModel,Field
from typing import Optional
from app.enums.plans import PlanPeriod,PlanTitle,AIResponseType


class Plans(SQLModel, table=True):
    __tablename__ = "plans"

    id: Optional[int] = Field(default=None, primary_key=True)
    plan_title: PlanTitle = Field(nullable=False)
    plan_period: PlanPeriod = Field(nullable=False)

    # Pricing & trial
    plan_amount: float = Field(nullable=False)
    free_trial_days: int = Field(default=0)

    # Features
    pdf_upload_limit: Optional[int] = Field(default=None)  # None = unlimited
    question_limit: Optional[int] = Field(default=None)    # None = unlimited
    ai_response_type: AIResponseType = Field(nullable=False)
    chat_history: bool = Field(default=False)
    priority_support: bool = Field(default=False)