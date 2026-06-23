from fastapi import APIRouter, Depends
from ..database import get_site_content_collection
from ..models.site_content import StoryOfHope, StoryOfHopeUpdate
from ..middleware.auth import get_current_admin

router = APIRouter(prefix="/api/site-content", tags=["Site Content"])

# Public route
@router.get("/story-of-hope", response_model=dict)
async def get_story_of_hope():
    """Get the Story of Hope content"""
    content_collection = await get_site_content_collection()
    
    story = await content_collection.find_one({"type": "story_of_hope"})
    
    if not story:
        # Return default if not found
        return {
            "title": "A Story of Hope",
            "patientName": "",
            "patientType": "",
            "quote": "",
            "image": "",
            "timeline": [],
            "impactStats": []
        }
    
    story["_id"] = str(story["_id"])
    return story

# Admin route
@router.put("/story-of-hope", response_model=dict)
async def update_story_of_hope(
    story_data: StoryOfHopeUpdate, 
    admin_data: dict = Depends(get_current_admin)
):
    """Update the Story of Hope content"""
    content_collection = await get_site_content_collection()
    
    # Remove None values
    update_data = {k: v for k, v in story_data.model_dump().items() if v is not None}
    
    await content_collection.update_one(
        {"type": "story_of_hope"},
        {"$set": update_data},
        upsert=True
    )
    
    updated_story = await content_collection.find_one({"type": "story_of_hope"})
    updated_story["_id"] = str(updated_story["_id"])
    
    return updated_story