from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime
from bson import ObjectId
from ..database import get_patients_collection
from ..models.patient import PatientCreate, PatientUpdate, PatientResponse
from ..middleware.auth import get_current_admin

router = APIRouter(prefix="/api/patients", tags=["Patients"])

# Helper function to convert MongoDB document to response
def patient_helper(patient) -> dict:
    return {
        "id": str(patient["_id"]),
        "name": patient["name"],
        "age": patient["age"],
        "cancerType": patient["cancerType"],
        "stage": patient["stage"],
        "location": patient["location"],
        "story": patient["story"],
        "shortStory": patient["shortStory"],
        "amountNeeded": patient["amountNeeded"],
        "amountRaised": patient.get("amountRaised", 0),
        "image": patient["image"],
        "gallery": patient.get("gallery", []),
        "videoUrl": patient.get("videoUrl", ""),
        "treatmentStatus": patient.get("treatmentStatus", "Pending Treatment"),
        "daysLeft": patient["daysLeft"],
        "hospitalName": patient["hospitalName"],
        "treatmentPlan": patient["treatmentPlan"],
        "created_at": patient.get("created_at"),
        "updated_at": patient.get("updated_at"),
    }

# Public routes (no auth required)
@router.get("/public", response_model=List[dict])
async def get_public_patients():
    """Get all patients for public view"""
    patients_collection = await get_patients_collection()
    patients = await patients_collection.find().to_list(length=100)
    return [patient_helper(patient) for patient in patients]

@router.get("/public/{patient_id}", response_model=dict)
async def get_public_patient(patient_id: str):
    """Get single patient for public view"""
    patients_collection = await get_patients_collection()
    
    try:
        patient = await patients_collection.find_one({"_id": ObjectId(patient_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID format"
        )
    
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    
    return patient_helper(patient)

# Admin routes (auth required)
@router.get("/", response_model=List[dict])
async def get_all_patients(admin_data: dict = Depends(get_current_admin)):
    """Get all patients (admin)"""
    patients_collection = await get_patients_collection()
    patients = await patients_collection.find().to_list(length=100)
    return [patient_helper(patient) for patient in patients]

@router.get("/{patient_id}", response_model=dict)
async def get_patient(patient_id: str, admin_data: dict = Depends(get_current_admin)):
    """Get single patient (admin)"""
    patients_collection = await get_patients_collection()
    
    try:
        patient = await patients_collection.find_one({"_id": ObjectId(patient_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID format"
        )
    
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    
    return patient_helper(patient)

@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_patient(patient: PatientCreate, admin_data: dict = Depends(get_current_admin)):
    """Create new patient"""
    patients_collection = await get_patients_collection()
    
    patient_dict = patient.model_dump()
    patient_dict["created_at"] = datetime.utcnow()
    patient_dict["updated_at"] = datetime.utcnow()
    
    result = await patients_collection.insert_one(patient_dict)
    
    new_patient = await patients_collection.find_one({"_id": result.inserted_id})
    
    return patient_helper(new_patient)

@router.put("/{patient_id}", response_model=dict)
async def update_patient(
    patient_id: str, 
    patient_update: PatientUpdate, 
    admin_data: dict = Depends(get_current_admin)
):
    """Update patient"""
    patients_collection = await get_patients_collection()
    
    try:
        object_id = ObjectId(patient_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID format"
        )
    
    # Check if patient exists
    existing_patient = await patients_collection.find_one({"_id": object_id})
    if not existing_patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    
    # Update only provided fields
    update_data = {k: v for k, v in patient_update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await patients_collection.update_one(
        {"_id": object_id},
        {"$set": update_data}
    )
    
    updated_patient = await patients_collection.find_one({"_id": object_id})
    
    return patient_helper(updated_patient)

@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_patient(patient_id: str, admin_data: dict = Depends(get_current_admin)):
    """Delete patient"""
    patients_collection = await get_patients_collection()
    
    try:
        object_id = ObjectId(patient_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID format"
        )
    
    result = await patients_collection.delete_one({"_id": object_id})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    
    return None