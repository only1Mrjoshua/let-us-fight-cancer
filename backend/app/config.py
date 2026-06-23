import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # MongoDB
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "letusfightcancer")
    
    # JWT
    JWT_SECRET: str = os.getenv("JWT_SECRET", "default-secret-change-me")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXPIRATION_DAYS: int = int(os.getenv("JWT_EXPIRATION_DAYS", "100"))
    
    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str = os.getenv("CLOUDINARY_CLOUD_NAME", "")
    CLOUDINARY_API_KEY: str = os.getenv("CLOUDINARY_API_KEY", "")
    CLOUDINARY_API_SECRET: str = os.getenv("CLOUDINARY_API_SECRET", "")
    
    # Admin
    ADMIN_USERNAME: str = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "admin123")
    
    # CORS
    FRONTEND_URL_DEV: str = os.getenv("FRONTEND_URL_DEV", "http://localhost:3000")
    FRONTEND_URL_PROD: str = os.getenv("FRONTEND_URL_PROD", "https://let-us-fight-cancer.onrender.com")
    
    @property
    def cors_origins(self):
        return [
            self.FRONTEND_URL_DEV,
            self.FRONTEND_URL_PROD,
            "http://localhost:5173",
            "http://localhost:3000",
            "https://letusfightcancer.com",
            "https://let-us-fight-cancer.onrender.com"
        ]

settings = Settings()