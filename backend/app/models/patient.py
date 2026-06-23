from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class PatientBase(BaseModel):
    name: str
    age: int
    cancerType: str
    stage: str
    location: str
    story: str
    shortStory: str
    amountNeeded: int
    amountRaised: int = 0
    image: str
    gallery: List[str] = []
    videoUrl: Optional[str] = ""
    treatmentStatus: str = "Pending Treatment"
    daysLeft: int
    hospitalName: str
    treatmentPlan: str

class PatientCreate(PatientBase):
    pass

class PatientUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    cancerType: Optional[str] = None
    stage: Optional[str] = None
    location: Optional[str] = None
    story: Optional[str] = None
    shortStory: Optional[str] = None
    amountNeeded: Optional[int] = None
    amountRaised: Optional[int] = None
    image: Optional[str] = None
    gallery: Optional[List[str]] = None
    videoUrl: Optional[str] = None
    treatmentStatus: Optional[str] = None
    daysLeft: Optional[int] = None
    hospitalName: Optional[str] = None
    treatmentPlan: Optional[str] = None

class PatientResponse(PatientBase):
    id: str = Field(alias="_id")
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True