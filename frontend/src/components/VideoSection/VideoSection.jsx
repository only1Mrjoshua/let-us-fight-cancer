import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Heart, Users, TrendingUp } from 'lucide-react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

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
            Watch real stories of hope, healing, and the impact of your generosity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-light">
              {!isPlaying ? (
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=675&fit=crop"
                    alt="Video thumbnail showing cancer patient receiving support"
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-dark bg-opacity-40 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl"
                      aria-label="Play video"
                    >
                      <Play className="w-10 h-10 text-primary-dark ml-1" aria-hidden="true" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-2xl"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="How donations change cancer patients' lives"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
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