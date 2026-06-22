import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Heart, Shield, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: 'Patients Apply',
      description: 'Cancer patients submit their medical needs and treatment costs for verification.',
      color: 'bg-primary-light',
    },
    {
      icon: Heart,
      title: 'Donors Contribute',
      description: 'Compassionate individuals and organizations donate to fund patient treatments.',
      color: 'bg-primary-medium',
    },
    {
      icon: Shield,
      title: 'Lives Are Saved',
      description: 'Verified patients receive treatment funding, and communities witness hope restored.',
      color: 'bg-primary-dark',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 font-heading">
            How It Works
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto font-body">
            A simple process that saves lives
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-light -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-primary-light border-opacity-20">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-dark rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                
                <h3 className="text-xl font-bold text-dark mb-3 font-heading">{step.title}</h3>
                <p className="text-neutral-gray leading-relaxed font-body">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-primary-medium" aria-hidden="true" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;