import os
import sys
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def fix_admin(username: str, password: str):
    MONGODB_URL = os.getenv("MONGODB_URL")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "letusfightcancer")
    
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    # Truncate password if too long
    if len(password) > 72:
        password = password[:72]
    
    hashed_password = pwd_context.hash(password)
    
    # Delete old admin
    await db.admins.delete_one({"username": username})
    
    # Create new admin with proper hash
    await db.admins.insert_one({
        "username": username,
        "password": hashed_password
    })
    
    print(f"Admin '{username}' fixed successfully!")
    client.close()

if __name__ == "__main__":
    username = sys.argv[1] if len(sys.argv) > 1 else "ernest"
    password = sys.argv[2] if len(sys.argv) > 2 else "ernest2026"
    asyncio.run(fix_admin(username, password))