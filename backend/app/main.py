from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .config import settings
from .database import Database
from .routes import admin, patients, site_content, upload

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    print("Starting up...")
    await Database.connect_db()
    yield
    # Shutdown
    print("Shutting down...")
    await Database.close_db()

app = FastAPI(
    title="Let Us Fight Cancer API",
    description="Backend API for Let Us Fight Cancer nonprofit platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(admin.router)
app.include_router(patients.router)
app.include_router(site_content.router)
app.include_router(upload.router)

@app.get("/")
async def root():
    return {
        "message": "Let Us Fight Cancer API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}