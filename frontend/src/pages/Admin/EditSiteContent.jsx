import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, Upload, Plus, Trash2, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';

const defaultStoryOfHope = {
  title: "A Story of Hope",
  patientName: "Fatima Bello",
  patientType: "Breast Cancer Survivor",
  quote: "When I heard the word 'cancer,' my world stopped. I was a mother of two, with no savings and no health insurance. The treatment costs were beyond anything I could afford. I had accepted my fate. But then, strangers became angels. Donations poured in. Words of encouragement lifted my spirit. Today, I'm cancer-free, and I owe my life to the kindness of people I may never meet.",
  image: "https://images.unsplash.com/photo-1516849677043-ef67c955e3b6?w=600&h=800&fit=crop",
  timeline: [
    { date: "March 2023", event: "Diagnosis - Stage 2 Breast Cancer" },
    { date: "April 2023", event: "Started Fundraising Campaign" },
    { date: "May 2023", event: "Community Raised $35K in 3 Weeks" },
    { date: "June 2023", event: "Began Treatment" },
    { date: "January 2024", event: "Cancer-Free - Story of Hope" },
  ],
  impactStats: [
    { icon: "Heart", value: "$35K", label: "Raised" },
    { icon: "Calendar", value: "6 Months", label: "Treatment" },
    { icon: "TrendingUp", value: "Cancer-Free", label: "Outcome" },
  ]
};

const EditSiteContent = () => {
  const navigate = useNavigate();
  
  const [storyData, setStoryData] = useState(defaultStoryOfHope);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState(null);

  // Fetch story of hope from backend on mount
  useEffect(() => {
    fetchStoryOfHope();
  }, []);

  const fetchStoryOfHope = async () => {
    try {
      const data = await api.siteContent.getStoryOfHope();
      if (data && data.title) {
        setStoryData(data);
      }
    } catch (err) {
      console.error('Failed to fetch story of hope:', err);
    } finally {
      setFetching(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...storyData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setStoryData(prev => ({ ...prev, timeline: newTimeline }));
  };

  const addTimelineEvent = () => {
    setStoryData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { date: '', event: '' }]
    }));
  };

  const removeTimelineEvent = (index) => {
    const newTimeline = storyData.timeline.filter((_, i) => i !== index);
    setStoryData(prev => ({ ...prev, timeline: newTimeline }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const result = await api.upload.image(file);
        setStoryData(prev => ({ ...prev, image: result.url }));
        showToast('Image uploaded successfully!', 'success');
      } catch (err) {
        showToast('Failed to upload image: ' + err.message, 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.siteContent.updateStoryOfHope(storyData);
      showToast('Story of Hope updated successfully!', 'success');
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
      setLoading(false);
    }
  };

  // Show loading while fetching
  if (fetching) {
    return (
      <main className="min-h-screen bg-neutral-light flex items-center justify-center">
        <p className="text-lg text-neutral-gray font-body">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-light">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-6 left-1/2 z-50"
          >
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-body text-sm ${
              toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              <CheckCircle className="w-5 h-5" />
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="bg-white shadow-sm border-b border-neutral-light sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-neutral-gray hover:text-primary-dark transition-colors font-body text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-xl font-bold text-dark font-heading">Edit Story of Hope</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-dark mb-6 font-heading">Story Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={storyData.title || ''} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2 font-body">Patient Name</label>
                  <input 
                    type="text" 
                    name="patientName" 
                    value={storyData.patientName || ''} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2 font-body">Patient Type</label>
                  <input 
                    type="text" 
                    name="patientType" 
                    value={storyData.patientType || ''} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2 font-body">Quote</label>
                <textarea 
                  name="quote" 
                  value={storyData.quote || ''} 
                  onChange={handleChange} 
                  rows="4"
                  className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" 
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-dark mb-6 font-heading">Story Image</h2>
            {storyData.image && (
              <div className="relative inline-block mb-4">
                <img 
                  src={storyData.image} 
                  alt="Story" 
                  className="w-64 h-80 object-cover rounded-xl" 
                />
              </div>
            )}
            <label className="flex flex-col items-center justify-center w-64 h-40 border-2 border-dashed border-neutral-light rounded-xl cursor-pointer hover:border-primary-dark transition-colors">
              <Upload className="w-8 h-8 text-neutral-gray mb-2" />
              <span className="text-sm text-neutral-gray font-body">Upload Image</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={loading} />
            </label>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark font-heading">Timeline</h2>
              <button 
                type="button" 
                onClick={addTimelineEvent}
                className="flex items-center gap-2 text-primary-dark hover:text-opacity-80 font-body text-sm"
              >
                <Plus className="w-4 h-4" /> Add Event
              </button>
            </div>
            <div className="space-y-4">
              {storyData.timeline && storyData.timeline.map((event, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={event.date || ''}
                      onChange={(e) => handleTimelineChange(index, 'date', e.target.value)}
                      placeholder="Date (e.g., March 2023)"
                      className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body mb-2" 
                    />
                    <input 
                      type="text" 
                      value={event.event || ''}
                      onChange={(e) => handleTimelineChange(index, 'event', e.target.value)}
                      placeholder="Event description"
                      className="w-full px-4 py-3 border border-neutral-light rounded-xl focus:outline-none focus:border-primary-dark font-body" 
                    />
                  </div>
                  {storyData.timeline.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeTimelineEvent(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button 
              type="submit" 
              whileHover={{ scale: loading ? 1 : 1.05 }} 
              whileTap={{ scale: loading ? 1 : 0.95 }}
              disabled={loading}
              className="flex items-center gap-2 bg-primary-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all font-body shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditSiteContent;