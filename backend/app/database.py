from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import IndexModel, ASCENDING
from .config import settings

class Database:
    client: AsyncIOMotorClient = None
    db = None
    
    @classmethod
    async def connect_db(cls):
        """Connect to MongoDB"""
        cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
        cls.db = cls.client[settings.DATABASE_NAME]
        
        # Create indexes
        await cls.create_indexes()
        
        print(f"Connected to MongoDB: {settings.DATABASE_NAME}")
    
    @classmethod
    async def close_db(cls):
        """Close MongoDB connection"""
        if cls.client:
            cls.client.close()
            print("MongoDB connection closed")
    
    @classmethod
    async def create_indexes(cls):
        """Create database indexes"""
        # Patients collection indexes
        await cls.db.patients.create_indexes([
            IndexModel([("name", ASCENDING)]),
            IndexModel([("treatmentStatus", ASCENDING)]),
        ])
        
        # Admins collection indexes
        await cls.db.admins.create_indexes([
            IndexModel([("username", ASCENDING)], unique=True),
        ])
        
        print("Database indexes created")
    
    @classmethod
    def get_db(cls):
        """Get database instance"""
        return cls.db

# Collection accessors
async def get_patients_collection():
    return Database.get_db()["patients"]

async def get_admins_collection():
    return Database.get_db()["admins"]

async def get_site_content_collection():
    return Database.get_db()["site_content"]