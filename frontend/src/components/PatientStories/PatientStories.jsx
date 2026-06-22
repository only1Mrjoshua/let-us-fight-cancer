import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { patients } from '../../data/patientData';
import DonationProgressBar from '../DonationProgressBar/DonationProgressBar';
import { useScrollTo } from '../../hooks/useScrollTo';

const PatientStories = () => {
  const { scrollToSection } = useScrollTo();

  return (
    <section id="patients" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 font-heading">
            Patients Who Need Your Help
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto font-body">
            Real people fighting real battles. Your donation can change their story.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {patients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-light border-opacity-20 group"
            >
              {/* Patient Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={patient.image}
                  alt={`${patient.name}, ${patient.cancerType} patient`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-40" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs font-semibold text-primary-dark font-body">
                    {patient.cancerType}
                  </span>
                </div>
              </div>

              {/* Patient Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-1 font-heading">{patient.name}</h3>
                <p className="text-sm text-neutral-gray mb-4 font-body">{patient.location}</p>
                
                <p className="text-dark text-opacity-80 mb-6 leading-relaxed text-sm font-body line-clamp-3">
                  {patient.story}
                </p>

                <DonationProgressBar 
                  raised={patient.amountRaised} 
                  needed={patient.amountNeeded} 
                />

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-light">
                  <div className="flex items-center gap-2 text-sm text-neutral-gray font-body">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>{patient.daysLeft} days left</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('donate')}
                    className="flex items-center gap-2 text-primary-dark font-semibold text-sm hover:text-opacity-80 transition-colors font-body"
                    aria-label={`View more about ${patient.name}`}
                  >
                    View More
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientStories;