import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Building2, 
  FileText, 
  Play,
  Mail,
  AlertCircle,
  ArrowLeft,
  DollarSign,
  Users,
  Shield,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DonationProgressBar from '../../components/DonationProgressBar/DonationProgressBar';
import CopyButton from '../../components/CopyButton/CopyButton';
import { api } from '../../services/api';

// Hardcoded crypto addresses
const CRYPTO_ADDRESSES = {
  bitcoin: "bc1ppwfe72mz7sj7yeg76evhghmzfye5rkrmuwwrj9znntzfpdmydf3smxf4x8",
  usdt: "TJP65KbZj5SwKCfFJuiHcqwcyM45F6LQgE",
  bnb: "0x97274e58fbba80198bd0ce5490caafd363806e2a",
};

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(false);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  const fetchPatient = async () => {
    try {
      const data = await api.patients.getOnePublic(id);
      setPatient(data);
    } catch (err) {
      console.error('Failed to fetch patient:', err);
      setPatient(null);
    } finally {
      setLoading(false);
    }
  };

  const isYouTubeUrl = patient?.videoUrl && (
    patient.videoUrl.includes('youtube.com') || 
    patient.videoUrl.includes('youtu.be')
  );

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (!patient?.gallery) return;
    setCurrentImageIndex((prev) => 
      prev === patient.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!patient?.gallery) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? patient.gallery.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-neutral-gray font-body">Loading...</p>
      </main>
    );
  }

  if (!patient) {
    return (
      <main className="min-h-screen bg-white">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <AlertCircle className="w-16 h-16 text-primary-dark mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-dark mb-2 font-heading">Patient Not Found</h2>
            <p className="text-neutral-gray mb-6 font-body">The patient you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/donate')}
              className="btn-primary"
            >
              Back to Donate Page
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate('/donate')}
          className="flex items-center gap-2 text-primary-dark hover:text-primary-dark hover:text-opacity-80 transition-colors font-body font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to All Patients
        </button>
      </div>

      {/* Hero Banner */}
      <section className="pt-8 pb-12 bg-gradient-to-br from-primary-light via-primary-medium to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold font-body ${
                  patient.treatmentStatus === 'Urgent' 
                    ? 'bg-red-500 text-white' 
                    : patient.treatmentStatus === 'In Treatment'
                    ? 'bg-primary-dark text-white'
                    : 'bg-yellow-500 text-white'
                }`}>
                  {patient.treatmentStatus}
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs font-semibold text-primary-dark font-body">
                  {patient.cancerType}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
                {patient.name}
              </h1>
              <div className="flex items-center gap-4 text-white text-opacity-90 mb-6 flex-wrap">
                {patient.location && (
                  <span className="flex items-center gap-1 font-body">
                    <MapPin className="w-4 h-4" />
                    {patient.location}
                  </span>
                )}
                <span className="font-body">{patient.age} years old</span>
                {patient.stage && <span className="font-body">{patient.stage}</span>}
              </div>
              <p className="text-lg text-white text-opacity-90 font-body">
                {patient.shortStory}
              </p>
            </div>

            <div className="relative">
              <img
                src={patient.image}
                alt={patient.name}
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl cursor-pointer"
                onClick={() => {
                  // Create combined gallery with main image first
                  const allImages = [patient.image, ...(patient.gallery || [])];
                  patient.gallery = allImages;
                  openLightbox(0);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Banner */}
      {patient.treatmentStatus === 'Urgent' && (
        <section className="bg-red-500 py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white font-bold font-body flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              URGENT: This patient needs immediate treatment. Every donation counts.
            </p>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Story & Details */}
            <div className="md:col-span-2 space-y-8">
              {/* Full Story */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-primary-light border-opacity-20">
                <h2 className="text-2xl font-bold text-dark mb-6 font-heading flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary-dark" />
                  Their Story
                </h2>
                <p className="text-dark leading-relaxed text-lg font-body whitespace-pre-line">
                  {patient.story}
                </p>
              </div>

              {/* Treatment Plan */}
              {(patient.hospitalName || patient.treatmentPlan || patient.stage || patient.daysLeft) && (
                <div className="bg-neutral-light rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-dark mb-6 font-heading flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-primary-dark" />
                    Treatment Plan
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {patient.hospitalName && (
                      <div>
                        <p className="text-sm text-neutral-gray font-body">Hospital</p>
                        <p className="text-dark font-semibold font-body">{patient.hospitalName}</p>
                      </div>
                    )}
                    {patient.treatmentPlan && (
                      <div>
                        <p className="text-sm text-neutral-gray font-body">Treatment</p>
                        <p className="text-dark font-semibold font-body">{patient.treatmentPlan}</p>
                      </div>
                    )}
                    {patient.stage && (
                      <div>
                        <p className="text-sm text-neutral-gray font-body">Stage</p>
                        <p className="text-dark font-semibold font-body">{patient.stage}</p>
                      </div>
                    )}
                    {patient.daysLeft !== undefined && patient.daysLeft !== null && (
                      <div>
                        <p className="text-sm text-neutral-gray font-body">Time Remaining</p>
                        <p className="text-dark font-semibold font-body flex items-center gap-1">
                          <Clock className="w-4 h-4 text-primary-dark" />
                          {patient.daysLeft} days left to reach goal
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Video Section */}
              {patient.videoUrl && (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-primary-light border-opacity-20">
                  <h2 className="text-2xl font-bold text-dark mb-6 font-heading flex items-center gap-2">
                    <Play className="w-6 h-6 text-primary-dark" />
                    Video Story
                  </h2>
                  {!activeVideo ? (
                    <div className="relative rounded-xl overflow-hidden cursor-pointer" onClick={() => setActiveVideo(true)}>
                      <img
                        src={patient.gallery && patient.gallery.length > 0 ? patient.gallery[0] : patient.image}
                        alt="Video thumbnail"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-dark bg-opacity-40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-primary-dark ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl overflow-hidden">
                      {isYouTubeUrl ? (
                        <div className="relative pb-[56.25%] h-0">
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={patient.videoUrl}
                            title={`${patient.name}'s story`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <video
                          src={patient.videoUrl}
                          controls
                          className="w-full rounded-xl"
                          poster={patient.gallery && patient.gallery.length > 0 ? patient.gallery[0] : patient.image}
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Photo Gallery */}
              {patient.gallery && patient.gallery.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-primary-light border-opacity-20">
                  <h2 className="text-2xl font-bold text-dark mb-6 font-heading">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {patient.gallery.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${patient.name} photo ${index + 1}`}
                        className="w-full h-40 md:h-48 object-cover rounded-xl cursor-pointer shadow-md hover:scale-105 transition-transform"
                        onClick={() => openLightbox(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Donation Card */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-primary-light">
                <h3 className="text-xl font-bold text-dark mb-4 font-heading">Donation Progress</h3>
                <DonationProgressBar 
                  raised={patient.amountRaised || 0} 
                  needed={patient.amountNeeded || 0} 
                />
                
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-neutral-light rounded-xl p-4 text-center">
                    <DollarSign className="w-6 h-6 text-primary-dark mx-auto mb-2" />
                    <p className="text-lg font-bold text-dark font-heading">
                      ${((patient.amountNeeded || 0) / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-neutral-gray font-body">Goal</p>
                  </div>
                  <div className="bg-neutral-light rounded-xl p-4 text-center">
                    <Users className="w-6 h-6 text-primary-dark mx-auto mb-2" />
                    <p className="text-lg font-bold text-dark font-heading">
                      ${((patient.amountRaised || 0) / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-neutral-gray font-body">Raised</p>
                  </div>
                </div>

                {/* Crypto Payment Details */}
                <div className="border-t border-neutral-light pt-6">
                  <h4 className="text-lg font-bold text-dark mb-4 font-heading flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    Crypto Donations
                  </h4>
                  
                  <p className="text-sm text-neutral-gray mb-4 font-body">
                    Send your donation via cryptocurrency. Choose your preferred network below.
                  </p>

                  <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                    <p className="text-sm font-bold text-dark mb-2 font-heading">Bitcoin (BTC)</p>
                    <div className="bg-white rounded-lg p-3 mb-2 break-all">
                      <p className="text-xs text-dark font-mono">{CRYPTO_ADDRESSES.bitcoin}</p>
                    </div>
                    <CopyButton text={CRYPTO_ADDRESSES.bitcoin} label="Copy BTC Address" />
                  </div>

                  <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                    <p className="text-sm font-bold text-dark mb-2 font-heading">USDT (TRC20)</p>
                    <div className="bg-white rounded-lg p-3 mb-2 break-all">
                      <p className="text-xs text-dark font-mono">{CRYPTO_ADDRESSES.usdt}</p>
                    </div>
                    <CopyButton text={CRYPTO_ADDRESSES.usdt} label="Copy USDT Address" />
                  </div>

                  <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                    <p className="text-sm font-bold text-dark mb-2 font-heading">BNB (BSC)</p>
                    <div className="bg-white rounded-lg p-3 mb-2 break-all">
                      <p className="text-xs text-dark font-mono">{CRYPTO_ADDRESSES.bnb}</p>
                    </div>
                    <CopyButton text={CRYPTO_ADDRESSES.bnb} label="Copy BNB Address" />
                  </div>
                </div>

                {/* Email Contact */}
                <div className="border-t border-neutral-light pt-6 mt-6">
                  <div className="bg-primary-light bg-opacity-30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary-dark flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-dark mb-1 font-heading">Questions or Alternative Payment?</p>
                        <p className="text-xs text-neutral-gray mb-2 font-body">
                          Contact us for other payment options or inquiries about this patient
                        </p>
                        <a 
                          href={`mailto:donations@letusfightcancer.com?subject=Donation%20Inquiry%20-%20Patient%20ID%20${patient.id}`}
                          className="text-sm font-semibold text-primary-dark hover:text-primary-dark hover:text-opacity-80 transition-colors font-body"
                        >
                          donations@letusfightcancer.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-neutral-gray font-body flex items-center justify-center gap-1">
                    <Shield className="w-4 h-4 text-primary-dark" />
                    100% of donations go directly to patient treatment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && patient.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close gallery"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 text-white font-body text-sm z-10">
              {currentImageIndex + 1} / {patient.gallery.length}
            </div>

            {/* Previous button */}
            {patient.gallery.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={patient.gallery[currentImageIndex]}
              alt={`${patient.name} photo ${currentImageIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next button */}
            {patient.gallery.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PatientDetails;