from datetime import datetime, timedelta
from jose import jwt
from app.core.config import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    # print(encoded_jwt,"[[token!!!!.........]]")
    return encoded_jwt

def get_cookie_settings(is_production: bool = False):
    return {
        "httponly": True,
        "secure": is_production,  # True for HTTPS, False for development
        "samesite": "lax"
    }