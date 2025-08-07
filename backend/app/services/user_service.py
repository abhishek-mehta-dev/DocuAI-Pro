from sqlalchemy.orm import Session
from app.db.models.user import User
from ..schemas.user import UserCreate,User_Login
from ..utils.hashing import Hasher
from ..enums.user_type import UserType
from fastapi import HTTPException, status
from datetime import timedelta
from app.core.config import settings
from app.core.security import create_access_token



def register(user: UserCreate, db: Session):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise ValueError("User with this email already exists")

    # Hash password
    hashed_password = Hasher.get_password_hash(user.password)

    # Create user object
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        username=user.username,
        email=user.email,
        password=hashed_password,
        user_type = user.user_type or UserType.USER 
    )

    # Save to DB
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def login(user: User_Login, db: Session):
    # Check if user exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Verify password
    if not Hasher.verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Create JWT
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email},
        expires_delta=access_token_expires
    )

    # Return ORM user and token (similar to register)
    return {
        "token": access_token,
        "user": db_user  # Pass ORM object for transformer
    }


def logout(user: User, db: Session):

    return user

