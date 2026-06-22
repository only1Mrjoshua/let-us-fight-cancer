import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Play } from 'lucide-react';
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter';
import { useScrollTo } from '../../hooks/useScrollTo';

const Hero = () => {
  const { scrollToSection } = useScrollTo();

  const floatingElements = [
    { icon: Heart, delay: 0, x: '10%', y: '20%' },
    { icon: Heart, delay: 1, x: '80%', y: '60%' },
    { icon: Heart, delay: 2, x: '20%', y: '80%' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-primary-medium to-primary-dark opacity-90" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 border border-white border-opacity-20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-64 h-64 border border-white border-opacity-10 rounded-full"
        />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block"
          style={{ left: element.x, top: element.y }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, delay: element.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <element.icon className="w-8 h-8 text-white text-opacity-30" />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Together We Can Give Cancer Patients Another Chance at Life
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white text-opacity-90 mb-8 leading-relaxed font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Every day, families struggle to afford life-saving cancer treatments. 
              Your support helps provide hope, treatment, and a fighting chance.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('donate')}
                className="btn-primary bg-white text-primary-dark hover:bg-opacity-90 flex items-center justify-center gap-2"
              >
                Donate Now
                <Heart className="w-5 h-5" aria-hidden="true" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('patients')}
                className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-dark flex items-center justify-center gap-2"
              >
                Read Patient Stories
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
            className="grid grid-cols-3 gap-4 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            >
            <AnimatedCounter end={5} prefix="$" suffix="M+" label="Raised" />
            <AnimatedCounter end={2500} suffix="+" label="Lives Impacted" />
            <AnimatedCounter end={300} suffix="+" label="Active Donors" />
            </motion.div>
          </motion.div>

          {/* Right Content - Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop"
                  alt="Cancer patient receiving support from family and healthcare professional"
                  className="w-full h-auto object-cover rounded-2xl"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark to-transparent opacity-30" />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark font-body">2,500+</p>
                    <p className="text-xs text-neutral-gray font-body">Patients Helped</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark font-body">Watch Story</p>
                    <p className="text-xs text-neutral-gray font-body">2 min video</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;