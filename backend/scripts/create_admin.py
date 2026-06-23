import os
import sys
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from dotenv import load_dotenv

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_admin(username: str, password: str):
    """Create admin user in MongoDB"""
    
    MONGODB_URL = os.getenv("MONGODB_URL")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "letusfightcancer")
    
    if not MONGODB_URL:
        print("Error: MONGODB_URL not found in .env file")
        return
    
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    # Check if admin already exists
    existing_admin = await db.admins.find_one({"username": username})
    
    if existing_admin:
        print(f"Admin '{username}' already exists. Updating password...")
        hashed_password = pwd_context.hash(password)
        await db.admins.update_one(
            {"username": username},
            {"$set": {"password": hashed_password}}
        )
        print(f"Password updated for admin: {username}")
    else:
        # Create new admin
        hashed_password = pwd_context.hash(password)
        admin_data = {
            "username": username,
            "password": hashed_password
        }
        await db.admins.insert_one(admin_data)
        print(f"Admin created successfully: {username}")
    
    client.close()
    print("Done!")

if __name__ == "__main__":
    # Get username and password from command line or use defaults
    if len(sys.argv) >= 3:
        username = sys.argv[1]
        password = sys.argv[2]
    else:
        from app.config import settings
        username = settings.ADMIN_USERNAME
        password = settings.ADMIN_PASSWORD
        print(f"Using default credentials from .env file")
    
    print(f"Creating admin: {username}")
    asyncio.run(create_admin(username, password))