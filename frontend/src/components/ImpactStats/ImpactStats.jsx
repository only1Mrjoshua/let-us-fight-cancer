import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Heart, Activity, Users } from 'lucide-react';
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter';

const ImpactStats = () => {
    const stats = [
    { icon: Wallet, end: 5, prefix: '$', suffix: 'M+', label: 'Donations Raised' },
    { icon: Heart, end: 2500, suffix: '+', label: 'Patients Helped' },
    { icon: Activity, end: 1800, suffix: '+', label: 'Successful Treatments' },
    { icon: Users, end: 300, suffix: '+', label: 'Volunteer Network' },
    ];

  const iconComponents = {
    Wallet: Wallet,
    Heart: Heart,
    Activity: Activity,
    Users: Users,
  };

  return (
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
            Our Impact
          </h2>
          <p className="text-lg text-neutral-gray font-body">
            Real numbers, real lives changed
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center"
              >
                <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-7 h-7 text-primary-dark" aria-hidden="true" />
                </div>
                <AnimatedCounter
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;