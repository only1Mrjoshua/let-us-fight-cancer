import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart, Calendar, TrendingUp } from 'lucide-react';

const EmotionalStory = () => {
    const timeline = [
    { date: 'March 2023', event: 'Diagnosis - Stage 2 Breast Cancer' },
    { date: 'April 2023', event: 'Started Fundraising Campaign' },
    { date: 'May 2023', event: 'Community Raised $35K in 3 Weeks' },
    { date: 'June 2023', event: 'Began Treatment' },
    { date: 'January 2024', event: 'Cancer-Free - Story of Hope' },
    ];

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
              A Story of Hope
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 relative">
              <Quote className="w-8 h-8 text-primary-light absolute -top-4 -left-4" aria-hidden="true" />
                <p className="text-lg text-dark italic leading-relaxed font-body">
                "When I heard the word 'cancer,' my world stopped. I was a mother of two, 
                with no savings and no health insurance. The treatment costs were beyond anything 
                I could afford. I had accepted my fate. But then, strangers became angels. 
                Donations poured in. Words of encouragement lifted my spirit. 
                Today, I'm cancer-free, and I owe my life to the kindness of people I may never meet."
                </p>
              <p className="mt-4 font-semibold text-primary-dark font-body">— Fatima Bello, Breast Cancer Survivor</p>
            </div>

            {/* Impact Summary */}
            <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow">
                <Heart className="w-6 h-6 text-primary-dark mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-semibold text-dark font-body">$35K</p>
                <p className="text-xs text-neutral-gray font-body">Raised</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow">
                <Calendar className="w-6 h-6 text-primary-dark mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-semibold text-dark font-body">6 Months</p>
                <p className="text-xs text-neutral-gray font-body">Treatment</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow">
                <TrendingUp className="w-6 h-6 text-primary-dark mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-semibold text-dark font-body">Cancer-Free</p>
                <p className="text-xs text-neutral-gray font-body">Outcome</p>
            </div>
            </div>
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
                src="https://images.unsplash.com/photo-1516849677043-ef67c955e3b6?w=600&h=800&fit=crop"
                alt="Fatima Bello, cancer survivor, embracing hope"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark to-transparent rounded-2xl opacity-30" />
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold text-dark mb-6 font-heading">Her Journey</h3>
              {timeline.map((item, index) => (
                <motion.div
                  key={item.date}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmotionalStory;