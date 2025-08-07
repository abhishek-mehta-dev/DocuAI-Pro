from __future__ import annotations
from typing import Optional
from datetime import datetime, date
from sqlmodel import Field, SQLModel
from ...enums.subscription_status import Status


class Subscription(SQLModel, table=True):
    __tablename__ = "subscriptions"

    id: Optional[int] = Field(default=None, primary_key=True)

    # Link to User via foreign key (manual lookup)
    user_id: Optional[int] = Field(default=None, foreign_key="users.id", unique=True)

    status: Status = Field(default=Status.ACTIVE)
    plan_id: int
    plan_choice_id: Optional[int] = None
    next_payment_date: Optional[date] = None
    used_free_trial: bool = Field(default=False)
    expired_at: Optional[datetime] = None
    is_renew_cancelled: bool = Field(default=False)
