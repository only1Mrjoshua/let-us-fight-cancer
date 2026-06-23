import os
import sys
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.hash import bcrypt
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv()

async def fix_admin(username: str, password: str):
    MONGODB_URL = os.getenv("MONGODB_URL")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "letusfightcancer")
    
    if not MONGODB_URL:
        print("Error: MONGODB_URL not found in .env file")
        return
    
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    # Use bcrypt directly with truncation
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    
    hashed = bcrypt.hash(password_bytes)
    print(f"New hash: {hashed[:20]}...")
    
    # Delete old admin
    result = await db.admins.delete_one({"username": username})
    print(f"Deleted old admin: {result.deleted_count}")
    
    # Create new admin
    await db.admins.insert_one({
        "username": username,
        "password": hashed
    })
    
    print(f"Admin '{username}' created successfully!")
    
    # Verify it works
    admin = await db.admins.find_one({"username": username})
    if admin:
        test_verify = bcrypt.verify(password_bytes, admin["password"])
        print(f"Password verification test: {test_verify}")
    
    client.close()

if __name__ == "__main__":
    username = sys.argv[1] if len(sys.argv) > 1 else "ernest"
    password = sys.argv[2] if len(sys.argv) > 2 else "ernest2026"
    print(f"Fixing admin: {username}")
    asyncio.run(fix_admin(username, password))