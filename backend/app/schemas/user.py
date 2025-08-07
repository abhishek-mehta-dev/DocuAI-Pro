from typing import Annotated, Optional
from pydantic import BaseModel, EmailStr, Field, validator
from ..enums.user_type import UserType

class UserCreate(BaseModel):
    first_name: Annotated[str, Field(min_length=1, max_length=50)]
    last_name: Annotated[str, Field(min_length=1, max_length=50)]
    username: Annotated[str, Field(min_length=3, max_length=50)]
    email: EmailStr
    password: Annotated[str, Field(min_length=6)]
    confirm_password: Annotated[str, Field(min_length=6)]
    user_type: Optional[UserType] = UserType.USER

    @validator("confirm_password")
    def passwords_match(cls, v, values):
        if "password" in values and v != values["password"]:
            raise ValueError("Passwords do not match")
        return v
    

class User_Login(BaseModel):
    email: EmailStr
    password: Annotated[str,Field(min_length=6)]



class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    email: EmailStr
    user_type: Optional[UserType] = UserType.USER

    class Config:
        from_attributes = True 


    


