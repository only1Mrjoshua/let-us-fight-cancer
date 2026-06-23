import React, { useState, useEffect } from 'react';
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
  Shield
} from 'lucide-react';
import DonationProgressBar from '../../components/DonationProgressBar/DonationProgressBar';
import CopyButton from '../../components/CopyButton/CopyButton';
import { api } from '../../services/api';

// Hardcoded crypto addresses
const CRYPTO_ADDRESSES = {
  bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  usdt: "TXtGQm9LZwGJ7K3mPq4g8B3hFv8cN2rD5s",
  bnb: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
};

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(false);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
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

              {/* Treatment Plan - Only show if there are treatment details */}
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

              {/* Video Section - Only show if video exists */}
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

              {/* Photo Gallery - Only show if gallery exists */}
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
                        onClick={() => window.open(img, '_blank')}
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

                  {/* Bitcoin */}
                  <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                    <p className="text-sm font-bold text-dark mb-2 font-heading">Bitcoin (BTC)</p>
                    <div className="bg-white rounded-lg p-3 mb-2 break-all">
                      <p className="text-xs text-dark font-mono">{CRYPTO_ADDRESSES.bitcoin}</p>
                    </div>
                    <CopyButton text={CRYPTO_ADDRESSES.bitcoin} label="Copy BTC Address" />
                  </div>

                  {/* USDT TRC20 */}
                  <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                    <p className="text-sm font-bold text-dark mb-2 font-heading">USDT (TRC20)</p>
                    <div className="bg-white rounded-lg p-3 mb-2 break-all">
                      <p className="text-xs text-dark font-mono">{CRYPTO_ADDRESSES.usdt}</p>
                    </div>
                    <CopyButton text={CRYPTO_ADDRESSES.usdt} label="Copy USDT Address" />
                  </div>

                  {/* BNB */}
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
    </main>
  );
};

export default PatientDetails;