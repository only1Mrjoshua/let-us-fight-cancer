import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, TrendingUp } from 'lucide-react';

const VideoSection = () => {
  const statsBesideVideo = [
    { icon: Heart, value: '$5M+', label: 'Raised in 2023' },
    { icon: Users, value: '2,500+', label: 'Patients Supported' },
    { icon: TrendingUp, value: '87%', label: 'Goes to Treatment' },
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
            See How Your Donations Change Lives
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto font-body">
            Real stories of hope, healing, and the impact of your generosity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Happy Family Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=675&fit=crop"
                alt="Happy family enjoying life together after cancer recovery"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {statsBesideVideo.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-neutral-light rounded-2xl p-6 shadow-lg"
              >
                <stat.icon className="w-8 h-8 text-primary-dark mb-3" aria-hidden="true" />
                <p className="text-2xl font-bold text-dark font-heading">{stat.value}</p>
                <p className="text-sm text-neutral-gray font-body">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;