from __future__ import annotations
from typing import Optional
from uuid import UUID
from pydantic import EmailStr
from sqlmodel import Field, SQLModel
from ...enums.user_type import UserType


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str = Field(nullable=False, max_length=50)
    last_name: str = Field(nullable=False, max_length=50)

    password: Optional[str] = Field(default=None)
    confirm_password: Optional[str] = Field(default=None)  

    email: EmailStr = Field(nullable=False, unique=True, index=True)
    username: str = Field(nullable=False, unique=True, index=True)

    user_type: UserType = Field(default=UserType.USER)
    reset_password_code: Optional[UUID] = Field(default=None, index=True)
    reset_password_expires: Optional[int] = Field(default=None)
    paypal_customer_id: Optional[str] = Field(default=None, max_length=100)
    paypal_payment_method_id: Optional[str] = Field(default=None, max_length=100)

    auth_provider: str = Field(default="email")
    google_id: Optional[str] = Field(default=None, unique=True, index=True)
