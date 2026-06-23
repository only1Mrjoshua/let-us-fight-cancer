from pydantic import BaseModel, Field
from typing import Optional, List

class TimelineEvent(BaseModel):
    date: str
    event: str

class ImpactStat(BaseModel):
    icon: str
    value: str
    label: str

class StoryOfHope(BaseModel):
    title: str = "A Story of Hope"
    patientName: str
    patientType: str
    quote: str
    image: str
    timeline: List[TimelineEvent] = []
    impactStats: List[ImpactStat] = []

class StoryOfHopeUpdate(BaseModel):
    title: Optional[str] = None
    patientName: Optional[str] = None
    patientType: Optional[str] = None
    quote: Optional[str] = None
    image: Optional[str] = None
    timeline: Optional[List[TimelineEvent]] = None
    impactStats: Optional[List[ImpactStat]] = None

class StoryOfHopeResponse(StoryOfHope):
    id: str = Field(alias="_id")
    
    class Config:
        from_attributes = True