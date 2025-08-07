from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from app.db.models.user import User
from app.db.session import get_session
from sqlmodel import Session
from app.core.security import create_access_token  # Your JWT creation
from fastapi import HTTPException, status

def handle_google_login(token_data: dict, db: Session):
    try:
        token = token_data.get("credential")
        if not token:
            raise ValueError("Missing Google ID token")

        # Verify token with Google
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request())

        if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            raise ValueError("Invalid issuer.")

        email = idinfo["email"]
        google_id = idinfo["sub"]
        first_name = idinfo.get("given_name", "")
        last_name = idinfo.get("family_name", "")

        # Lookup user
        user = db.query(User).filter(User.email == email).first()

        if not user:
            # Create new user
            user = User(
                email=email,
                google_id=google_id,
                first_name=first_name,
                last_name=last_name,
                username=email.split("@")[0],
                auth_provider="google",
                password=None
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Create JWT token
        access_token = create_access_token(data={"sub": user.email})

        return {"access_token": access_token, "user": user}

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e) or "Invalid token",
        )