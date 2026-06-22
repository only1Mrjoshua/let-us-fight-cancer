import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
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
import { extendedPatients } from '../../data/extendedPatientData';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(false);

  const patient = extendedPatients.find(p => p.id === parseInt(id));

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
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/donate')}
          className="flex items-center gap-2 text-primary-dark hover:text-primary-dark hover:text-opacity-80 transition-colors font-body font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to All Patients
        </motion.button>
      </div>

      {/* Hero Banner */}
      <section className="pt-8 pb-12 bg-gradient-to-br from-primary-light via-primary-medium to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
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
                <span className="flex items-center gap-1 font-body">
                  <MapPin className="w-4 h-4" />
                  {patient.location}
                </span>
                <span className="font-body">{patient.age} years old</span>
                <span className="font-body">{patient.stage}</span>
              </div>
              <p className="text-lg text-white text-opacity-90 font-body">
                {patient.shortStory}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={patient.image}
                alt={patient.name}
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-primary-light border-opacity-20"
              >
                <h2 className="text-2xl font-bold text-dark mb-6 font-heading flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary-dark" />
                  Their Story
                </h2>
                <p className="text-dark leading-relaxed text-lg font-body whitespace-pre-line">
                  {patient.story}
                </p>
              </motion.div>

              {/* Treatment Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-neutral-light rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-dark mb-6 font-heading flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-primary-dark" />
                  Treatment Plan
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-gray font-body">Hospital</p>
                    <p className="text-dark font-semibold font-body">{patient.hospitalName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-gray font-body">Treatment</p>
                    <p className="text-dark font-semibold font-body">{patient.treatmentPlan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-gray font-body">Stage</p>
                    <p className="text-dark font-semibold font-body">{patient.stage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-gray font-body">Time Remaining</p>
                    <p className="text-dark font-semibold font-body flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary-dark" />
                      {patient.daysLeft} days left to reach goal
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Video Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-primary-light border-opacity-20"
              >
                <h2 className="text-2xl font-bold text-dark mb-6 font-heading flex items-center gap-2">
                  <Play className="w-6 h-6 text-primary-dark" />
                  Video Story
                </h2>
                {!activeVideo ? (
                  <div className="relative rounded-xl overflow-hidden cursor-pointer" onClick={() => setActiveVideo(true)}>
                    <img
                      src={patient.gallery[0]}
                      alt="Video thumbnail"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-dark bg-opacity-40 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Play className="w-8 h-8 text-primary-dark ml-1" />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={patient.videoUrl}
                      title={`${patient.name}'s story`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </motion.div>

              {/* Photo Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-primary-light border-opacity-20"
              >
                <h2 className="text-2xl font-bold text-dark mb-6 font-heading">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {patient.gallery.map((img, index) => (
                    <motion.img
                      key={index}
                      src={img}
                      alt={`${patient.name} photo ${index + 1}`}
                      className="w-full h-40 md:h-48 object-cover rounded-xl cursor-pointer shadow-md"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => window.open(img, '_blank')}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Donation Card */}
            <div className="space-y-6">
              {/* Progress Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-6 border-2 border-primary-light sticky top-6"
              >
                <h3 className="text-xl font-bold text-dark mb-4 font-heading">Donation Progress</h3>
                <DonationProgressBar 
                  raised={patient.amountRaised} 
                  needed={patient.amountNeeded} 
                />
                
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-neutral-light rounded-xl p-4 text-center">
                    <DollarSign className="w-6 h-6 text-primary-dark mx-auto mb-2" />
                    <p className="text-lg font-bold text-dark font-heading">
                      ${(patient.amountNeeded / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-neutral-gray font-body">Goal</p>
                  </div>
                  <div className="bg-neutral-light rounded-xl p-4 text-center">
                    <Users className="w-6 h-6 text-primary-dark mx-auto mb-2" />
                    <p className="text-lg font-bold text-dark font-heading">
                      ${(patient.amountRaised / 1000).toFixed(0)}K
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
                    <p className="text-sm font-bold text-dark mb-2 font-heading">
                      Bitcoin (BTC)
                    </p>
                    <div className="bg-white rounded-lg p-3 mb-2 break-all">
                      <p className="text-xs text-dark font-mono">{patient.cryptoAddresses.bitcoin}</p>
                    </div>
                    <CopyButton text={patient.cryptoAddresses.bitcoin} label="Copy BTC Address" />
                  </div>

                  {/* USDT TRC20 */}
                  <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                    <p className="text-sm font-bold text-dark mb-2 font-heading">
                      USDT (TRC20)
                    </p>
                    <div className="bg-white rounded-lg p-3 mb-2 break-all">
                      <p className="text-xs text-dark font-mono">{patient.cryptoAddresses.usdt}</p>
                    </div>
                    <CopyButton text={patient.cryptoAddresses.usdt} label="Copy USDT Address" />
                  </div>

                  {/* BNB */}
                  <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                    <p className="text-sm font-bold text-dark mb-2 font-heading">
                      BNB (BSC)
                    </p>
                    <div className="bg-white rounded-lg p-3 mb-2 break-all">
                      <p className="text-xs text-dark font-mono">{patient.cryptoAddresses.bnb}</p>
                    </div>
                    <CopyButton text={patient.cryptoAddresses.bnb} label="Copy BNB Address" />
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
                          Contact us for other payment options or inquiries about this patient.
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
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PatientDetails;