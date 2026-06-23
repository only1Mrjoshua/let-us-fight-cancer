from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timedelta
from jose import jwt
from passlib.hash import bcrypt
from ..config import settings
from ..database import get_admins_collection
from ..models.admin import AdminLogin
import traceback

router = APIRouter(prefix="/api/admin", tags=["Admin"])

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=settings.JWT_EXPIRATION_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.JWT_SECRET, 
        algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        # Truncate password to 72 bytes for bcrypt
        password_bytes = plain_password.encode('utf-8')
        if len(password_bytes) > 72:
            password_bytes = password_bytes[:72]
        return bcrypt.verify(password_bytes, hashed_password)
    except Exception as e:
        print(f"Password verification error: {e}")
        return False

@router.post("/login")
async def admin_login(login_data: AdminLogin):
    try:
        print(f"Login attempt: {login_data.username}")
        
        admins_collection = await get_admins_collection()
        admin = await admins_collection.find_one({"username": login_data.username})
        
        print(f"Admin found: {admin is not None}")
        
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password"
            )
        
        password_ok = verify_password(login_data.password, admin["password"])
        print(f"Password ok: {password_ok}")
        
        if not password_ok:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password"
            )
        
        access_token = create_access_token(data={"sub": admin["username"]})
        print("Login successful")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in": settings.JWT_EXPIRATION_DAYS * 24 * 60 * 60
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"LOGIN ERROR: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login error: {str(e)}"
        )

@router.get("/verify-token")
async def verify_token(admin_data: dict = None):
    if admin_data:
        return {"valid": True, "username": admin_data.get("username", "unknown")}
    return {"valid": False, "username": "unknown"}