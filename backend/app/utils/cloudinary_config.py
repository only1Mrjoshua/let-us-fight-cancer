import cloudinary
import cloudinary.uploader
from ..config import settings

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)

async def upload_image(file):
    """Upload image to Cloudinary"""
    contents = await file.read()
    
    result = cloudinary.uploader.upload(
        contents,
        folder="let-us-fight-cancer/images",
        resource_type="image",
        transformation=[
            {"quality": "auto", "fetch_format": "auto"}
        ]
    )
    
    return result

async def upload_video(file):
    """Upload video to Cloudinary"""
    contents = await file.read()
    
    result = cloudinary.uploader.upload(
        contents,
        folder="let-us-fight-cancer/videos",
        resource_type="video"
    )
    
    return result