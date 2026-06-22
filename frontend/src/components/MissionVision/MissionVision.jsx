import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

const MissionVision = () => {
  const cards = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'We connect compassionate donors with cancer patients who need financial assistance for life-saving treatments. By bridging the gap between hope and healthcare, we ensure no one fights alone.',
      color: 'from-primary-light to-primary-medium',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'We envision a future where no cancer patient is denied treatment due to financial limitations. A world where every diagnosis comes with hope, support, and the resources needed to fight.',
      color: 'from-primary-medium to-primary-dark',
    },
  ];

  return (
    <section id="mission" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 font-heading">
            Why We Exist
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto font-body">
            Every cancer patient deserves a fighting chance. We're here to make that possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-primary-light border-opacity-30 h-full">
                <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <card.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4 font-heading">{card.title}</h3>
                <p className="text-neutral-gray leading-relaxed font-body">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;