import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Clock, MapPin, Users } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import DonationProgressBar from '../../components/DonationProgressBar/DonationProgressBar';
import { api } from '../../services/api';

const Donate = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await api.patients.getAllPublic();
      setPatients(data);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-light via-primary-medium to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
              Choose a Life to Save Today
            </h1>
            <p className="text-xl text-white text-opacity-90 max-w-3xl mx-auto font-body">
              Every patient below is fighting for their life. Your donation, no matter the size, 
              brings them one step closer to recovery. Read their stories and choose to make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white shadow-lg -mt-8 relative z-10 mx-4 rounded-2xl max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 p-6">
          <div className="text-center">
            <Heart className="w-8 h-8 text-primary-dark mx-auto mb-2" />
            <p className="text-2xl font-bold text-dark font-heading">$5M+</p>
            <p className="text-sm text-neutral-gray font-body">Total Raised</p>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-primary-dark mx-auto mb-2" />
            <p className="text-2xl font-bold text-dark font-heading">2,500+</p>
            <p className="text-sm text-neutral-gray font-body">Lives Impacted</p>
          </div>
          <div className="text-center">
            <Heart className="w-8 h-8 text-primary-dark mx-auto mb-2" />
            <p className="text-2xl font-bold text-dark font-heading">100%</p>
            <p className="text-sm text-neutral-gray font-body">Transparency</p>
          </div>
        </div>
      </section>

      {/* Patient Stories Grid */}
      <section className="section-padding bg-neutral-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 font-heading">
              Patients Waiting for Help
            </h2>
            <p className="text-lg text-neutral-gray font-body">
              Click "View More" to see their full story and donate
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-neutral-gray font-body">Loading patients...</p>
            </div>
          ) : patients.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-primary-light mx-auto mb-4" />
              <p className="text-xl text-neutral-gray font-body">No patients currently listed. Check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {patients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-light border-opacity-20"
                >
                  {/* Patient Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={patient.image}
                      alt={`${patient.name}, ${patient.cancerType} patient`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-40" />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold font-body ${
                        patient.treatmentStatus === 'Urgent' 
                          ? 'bg-red-500 text-white' 
                          : patient.treatmentStatus === 'In Treatment'
                          ? 'bg-primary-dark text-white'
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {patient.treatmentStatus}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs font-semibold text-primary-dark font-body">
                        {patient.cancerType}
                      </span>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-dark font-heading">{patient.name}</h3>
                        <p className="text-sm text-neutral-gray font-body">{patient.age} years old</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-neutral-gray font-body">
                        <MapPin className="w-4 h-4" />
                        <span>{patient.location}</span>
                      </div>
                    </div>

                    <p className="text-dark text-opacity-80 mb-6 leading-relaxed text-sm font-body line-clamp-3">
                      {patient.shortStory}
                    </p>

                    <DonationProgressBar 
                      raised={patient.amountRaised || 0} 
                      needed={patient.amountNeeded || 0} 
                    />

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-light">
                      <div className="flex items-center gap-2 text-sm text-neutral-gray font-body">
                        <Clock className="w-4 h-4" />
                        <span>{patient.daysLeft} days left</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/patient/${patient.id}`)}
                        className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-opacity-90 transition-all font-body"
                      >
                        View More
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-light via-primary-medium to-primary-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
              Can't Choose? Donate to the General Fund
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-8 font-body">
              Your donation will be distributed to patients with the most urgent needs
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary bg-white text-primary-dark hover:bg-opacity-90 text-lg px-10 py-4 flex items-center gap-2 mx-auto"
            >
              <Heart className="w-6 h-6" />
              Donate to General Fund
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Donate;