from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from ..config import settings
from ..database import get_admins_collection
from ..models.admin import AdminLogin, TokenResponse

router = APIRouter(prefix="/api/admin", tags=["Admin"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    """Create JWT token"""
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
    """Verify password against hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash password"""
    return pwd_context.hash(password)

@router.post("/login", response_model=TokenResponse)
async def admin_login(login_data: AdminLogin):
    """Admin login endpoint"""
    admins_collection = await get_admins_collection()
    
    # Find admin
    admin = await admins_collection.find_one({"username": login_data.username})
    
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # Verify password
    if not verify_password(login_data.password, admin["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # Create token
    access_token = create_access_token(data={"sub": admin["username"]})
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.JWT_EXPIRATION_DAYS * 24 * 60 * 60
    )

@router.get("/verify-token")
async def verify_token(admin_data: dict = None):
    """Verify if token is still valid"""
    # The middleware already verified the token
    return {"valid": True, "username": admin_data["username"]}