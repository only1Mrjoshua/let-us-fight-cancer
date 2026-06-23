from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from .config import settings
from .database import Database
from .routes import admin, patients, site_content, upload
import traceback

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up...")
    await Database.connect_db()
    yield
    print("Shutting down...")
    await Database.close_db()

app = FastAPI(
    title="Let Us Fight Cancer API",
    description="Backend API for Let Us Fight Cancer nonprofit platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS - Allow ALL origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"Error: {str(exc)}")
    print(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"}
    )

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