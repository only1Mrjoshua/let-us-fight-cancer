import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Lock, Users, CheckCircle } from 'lucide-react';
import { useScrollTo } from '../../hooks/useScrollTo';

const DonationCTA = () => {
  const { scrollToSection } = useScrollTo();

  const trustIndicators = [
    { icon: Shield, text: '100% Secure Donations' },
    { icon: Lock, text: 'SSL Encrypted' },
    { icon: CheckCircle, text: 'Verified Organization' },
    { icon: Users, text: 'Trusted by 2,500+ Donors' },
  ];

  return (
    <section id="donate" className="section-padding bg-gradient-to-br from-primary-light via-primary-medium to-primary-dark">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-heading">
            Your Donation Could Be the Difference Between Giving Up and Fighting On
          </h2>
          
          <p className="text-xl text-white text-opacity-90 mb-12 leading-relaxed font-body">
            Every donation brings hope. Every donation saves a life. Be the reason someone 
            gets another chance to fight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary bg-white text-primary-dark hover:bg-opacity-90 text-lg px-10 py-4 flex items-center justify-center gap-2"
            >
              <Heart className="w-6 h-6" aria-hidden="true" />
              Donate Now
            </motion.button>
        
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center justify-center gap-2"
              >
                <indicator.icon className="w-5 h-5 text-white text-opacity-80" aria-hidden="true" />
                <span className="text-sm text-white text-opacity-90 font-body">{indicator.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationCTA;