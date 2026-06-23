import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart, Calendar, TrendingUp } from 'lucide-react';
import { api } from '../../services/api';

const EmotionalStory = () => {
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoryOfHope();
  }, []);

  const fetchStoryOfHope = async () => {
    try {
      const data = await api.siteContent.getStoryOfHope();
      if (data && data.title) {
        setStoryData(data);
      }
    } catch (err) {
      console.error('Failed to fetch story of hope:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-neutral-light">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-gray font-body">Loading...</p>
        </div>
      </section>
    );
  }

  if (!storyData) return null;

  return (
    <section className="section-padding bg-neutral-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6 font-heading">
              {storyData.title}
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 relative">
              <Quote className="w-8 h-8 text-primary-light absolute -top-4 -left-4" aria-hidden="true" />
              <p className="text-lg text-dark italic leading-relaxed font-body">
                "{storyData.quote}"
              </p>
              <p className="mt-4 font-semibold text-primary-dark font-body">
                — {storyData.patientName}, {storyData.patientType}
              </p>
            </div>

            {/* Impact Summary */}
            {storyData.impactStats && (
              <div className="grid grid-cols-3 gap-4">
                {storyData.impactStats.map((stat, index) => {
                  const IconComponent = 
                    stat.icon === 'Heart' ? Heart : 
                    stat.icon === 'Calendar' ? Calendar : 
                    TrendingUp;
                  return (
                    <div key={index} className="bg-white rounded-xl p-4 text-center shadow">
                      <IconComponent className="w-6 h-6 text-primary-dark mx-auto mb-2" aria-hidden="true" />
                      <p className="text-sm font-semibold text-dark font-body">{stat.value}</p>
                      <p className="text-xs text-neutral-gray font-body">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src={storyData.image}
                alt={storyData.patientName}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark to-transparent rounded-2xl opacity-30" />
            </div>

            {storyData.timeline && (
              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-bold text-dark mb-6 font-heading">Her Journey</h3>
                {storyData.timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-primary-dark mt-2" />
                    <div>
                      <p className="text-sm font-semibold text-primary-dark font-body">{item.date}</p>
                      <p className="text-dark font-body">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmotionalStory;