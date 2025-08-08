from pydantic import BaseModel
from typing import Optional
from app.enums.plans import PlanPeriod, PlanTitle, AIResponseType


class PlanRead(BaseModel):
    id: int
    plan_title: PlanTitle
    plan_period: PlanPeriod
    plan_amount: float
    free_trial_days: int
    pdf_upload_limit: Optional[int]
    question_limit: Optional[int]
    ai_response_type: AIResponseType
    chat_history: bool
    priority_support: bool

    class Config:
        from_attributes = True  # allows direct ORM to schema conversion
