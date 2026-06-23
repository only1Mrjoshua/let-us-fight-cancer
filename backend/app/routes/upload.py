from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
from ..middleware.auth import get_current_admin
from ..utils.cloudinary_config import upload_image, upload_video

router = APIRouter(prefix="/api/upload", tags=["Upload"])

@router.post("/image")
async def upload_image_file(
    file: UploadFile = File(...),
    admin_data: dict = Depends(get_current_admin)
):
    """Upload an image to Cloudinary"""
    # Validate file type
    allowed_image_types = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if file.content_type not in allowed_image_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type '{file.content_type}' is not allowed. Allowed types: JPEG, PNG, GIF, WebP"
        )
    
    # Check file size (max 10MB)
    contents = await file.read()
    await file.seek(0)  # Reset file pointer
    
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds 10MB limit"
        )
    
    try:
        result = await upload_image(file)
        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
            "message": "Image uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload image: {str(e)}"
        )

@router.post("/video")
async def upload_video_file(
    file: UploadFile = File(...),
    admin_data: dict = Depends(get_current_admin)
):
    """Upload a video to Cloudinary"""
    # Validate file type
    allowed_video_types = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"]
    if file.content_type not in allowed_video_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type '{file.content_type}' is not allowed. Allowed types: MP4, WebM, OGG, MOV"
        )
    
    # Check file size (max 100MB)
    contents = await file.read()
    await file.seek(0)  # Reset file pointer
    
    if len(contents) > 100 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds 100MB limit"
        )
    
    try:
        result = await upload_video(file)
        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
            "message": "Video uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload video: {str(e)}"
        )