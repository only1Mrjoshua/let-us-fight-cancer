import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X, Video, Plus } from 'lucide-react';
import { api } from '../../services/api';

const PatientForm = ({ isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    cancerType: '',
    stage: '',
    location: '',
    story: '',
    shortStory: '',
    amountNeeded: '',
    amountRaised: '0',
    treatmentStatus: 'Pending Treatment',
    daysLeft: '',
    hospitalName: '',
    treatmentPlan: '',
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch patient data if editing
  useEffect(() => {
    if (isEditing && id) {
      fetchPatient();
    }
  }, [isEditing, id]);

  const fetchPatient = async () => {
    try {
      const patient = await api.adminPatients.getOne(id);
      if (patient) {
        setFormData({
          name: patient.name || '',
          age: patient.age ? patient.age.toString() : '',
          cancerType: patient.cancerType || '',
          stage: patient.stage || '',
          location: patient.location || '',
          story: patient.story || '',
          shortStory: patient.shortStory || '',
          amountNeeded: patient.amountNeeded ? patient.amountNeeded.toString() : '',
          amountRaised: patient.amountRaised ? patient.amountRaised.toString() : '0',
          treatmentStatus: patient.treatmentStatus || 'Pending Treatment',
          daysLeft: patient.daysLeft ? patient.daysLeft.toString() : '',
          hospitalName: patient.hospitalName || '',
          treatmentPlan: patient.treatmentPlan || '',
        });
        setMainImagePreview(patient.image || '');
        setGalleryPreviews(patient.gallery || []);
        setVideoPreview(patient.videoUrl || '');
      }
    } catch (err) {
      alert('Failed to fetch patient: ' + err.message);
      navigate('/admin/dashboard');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const result = await api.upload.image(file);
        setMainImagePreview(result.url);
        setMainImage(null); // No need to keep file reference
      } catch (err) {
        alert('Failed to upload image: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      try {
        setLoading(true);
        const result = await api.upload.image(file);
        setGalleryPreviews(prev => [...prev, result.url]);
      } catch (err) {
        alert('Failed to upload gallery image: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    setGalleryImages(prev => [...prev, ...files]);
  };

  const removeGalleryImage = (index) => {
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const result = await api.upload.video(file);
        setVideoPreview(result.url);
        setVideoFile(null);
      } catch (err) {
        alert('Failed to upload video: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeMainImage = () => {
    setMainImage(null);
    setMainImagePreview('');
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const patientData = {
      ...formData,
      age: parseInt(formData.age),
      amountNeeded: parseInt(formData.amountNeeded),
      amountRaised: parseInt(formData.amountRaised),
      daysLeft: parseInt(formData.daysLeft),
      image: mainImagePreview || 'https://via.placeholder.com/400',
      gallery: galleryPreviews.length > 0 ? galleryPreviews : [],
      videoUrl: videoPreview || '',
    };

    try {
      if (isEditing) {
        await api.adminPatients.update(id, patientData);
      } else {
        await api.adminPatients.create(patientData);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Failed to save patient: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-light">
      {/* Admin Nav */}
      <nav className="bg-white shadow-sm border-b border-neutral-light sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-neutral-gray hover:text-primary-dark transition-colors font-body text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-xl font-bold text-dark font-heading">
              {isEditing ? 'Edit Patient' : 'Add New Patient'}
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-dark mb-6 font-heading">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Age *</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Cancer Type *</label>
                <input type="text" name="cancerType" value={formData.cancerType} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Stage *</label>
                <input type="text" name="stage" value={formData.stage} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Location *</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-dark mb-6 font-heading">Patient Story</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Short Story (max 80 words) *</label>
                <textarea name="shortStory" value={formData.shortStory} onChange={handleChange} required rows="3"
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Full Story *</label>
                <textarea name="story" value={formData.story} onChange={handleChange} required rows="6"
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
            </div>
          </div>

          {/* Treatment */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-dark mb-6 font-heading">Treatment Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Treatment Status *</label>
                <select name="treatmentStatus" value={formData.treatmentStatus} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body">
                  <option value="Pending Treatment">Pending Treatment</option>
                  <option value="In Treatment">In Treatment</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Days Left *</label>
                <input type="number" name="daysLeft" value={formData.daysLeft} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Hospital Name *</label>
                <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Treatment Plan *</label>
                <input type="text" name="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
            </div>
          </div>

          {/* Financial */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-dark mb-6 font-heading">Financial Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Amount Needed ($) *</label>
                <input type="number" name="amountNeeded" value={formData.amountNeeded} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Amount Raised ($)</label>
                <input type="number" name="amountRaised" value={formData.amountRaised} onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" />
              </div>
            </div>
          </div>

          {/* Media Uploads */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-dark mb-6 font-heading">Media Uploads</h2>
            
            {/* Main Image */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-dark mb-3 font-body">
                Main Patient Photo * (Required)
              </label>
              {mainImagePreview ? (
                <div className="relative inline-block">
                  <img src={mainImagePreview} alt="Main patient" className="w-48 h-48 object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-neutral-light rounded-xl cursor-pointer hover:border-primary-dark transition-colors">
                  <Upload className="w-8 h-8 text-neutral-gray mb-2" />
                  <span className="text-sm text-neutral-gray font-body">Upload Photo</span>
                  <input type="file" accept="image/*" onChange={handleMainImageUpload} className="hidden" required={!isEditing} disabled={loading} />
                </label>
              )}
            </div>

            {/* Gallery Images */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-dark mb-3 font-body">
                Gallery Images (Optional - Add multiple photos)
              </label>
              <div className="flex flex-wrap gap-4 mb-4">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Gallery ${index + 1}`} className="w-32 h-32 object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-neutral-light rounded-xl cursor-pointer hover:border-primary-dark transition-colors">
                  <Plus className="w-6 h-6 text-neutral-gray mb-1" />
                  <span className="text-xs text-neutral-gray font-body">Add</span>
                  <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" disabled={loading} />
                </label>
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-3 font-body">
                Video (Optional - Upload patient story video)
              </label>
              {videoPreview ? (
                <div className="relative">
                  <video src={videoPreview} controls className="w-full max-w-md rounded-xl" />
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full max-w-md h-40 border-2 border-dashed border-neutral-light rounded-xl cursor-pointer hover:border-primary-dark transition-colors">
                  <Video className="w-10 h-10 text-neutral-gray mb-2" />
                  <span className="text-sm text-neutral-gray font-body">Upload Video</span>
                  <span className="text-xs text-neutral-gray font-body mt-1">MP4, WebM, or OGG</span>
                  <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" disabled={loading} />
                </label>
              )}
            </div>

            <p className="text-xs text-neutral-gray mt-4 font-body">
              Note: You must upload either photos or a video. At least the main photo is required.
            </p>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-3 border border-neutral-light rounded-full text-neutral-gray hover:bg-neutral-light transition-colors font-body">
              Cancel
            </button>
            <motion.button 
              type="submit" 
              whileHover={{ scale: loading ? 1 : 1.05 }} 
              whileTap={{ scale: loading ? 1 : 0.95 }}
              disabled={loading}
              className="flex items-center gap-2 bg-primary-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all font-body shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : isEditing ? 'Update Patient' : 'Add Patient'}
            </motion.button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PatientForm;