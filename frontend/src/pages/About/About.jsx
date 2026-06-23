import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Shield, Users } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const About = () => {
  return (
    <main>
      <Navbar />
      
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary-light via-primary-medium to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">About Let Us Fight Cancer</h1>
            <p className="text-xl text-white text-opacity-90 font-body">
              A nonprofit organization dedicated to helping cancer patients access life-saving treatment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-dark mb-4 font-heading">Our Mission</h2>
            <p className="text-dark leading-relaxed mb-8 font-body">
              Let Us Fight Cancer is a nonprofit organization dedicated to bridging the gap between cancer patients and the financial resources they 
              need for treatment. We believe that no one should be denied life-saving care because 
              of their financial situation.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4 font-heading">What We Do</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-primary-dark flex-shrink-0 mt-1" />
                <span className="text-dark font-body">Connect donors directly with verified cancer patients in need of treatment funding</span>
              </li>
              <li className="flex items-start gap-3">
                <Target className="w-6 h-6 text-primary-dark flex-shrink-0 mt-1" />
                <span className="text-dark font-body">Provide 100% transparent donation tracking, every dollar goes to patient care</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-6 h-6 text-primary-dark flex-shrink-0 mt-1" />
                <span className="text-dark font-body">Build a community of donors, survivors, and healthcare professionals fighting cancer together</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary-dark flex-shrink-0 mt-1" />
                <span className="text-dark font-body">Verify every patient story to ensure authenticity and proper use of funds</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mb-4 font-heading">Our Story</h2>
            <p className="text-dark leading-relaxed mb-4 font-body">
              Founded in 2016, Let Us Fight Cancer was born from a simple belief: that everyone 
              deserves a fighting chance against cancer. We saw too many families forced to choose 
              between treatment and financial ruin, and we decided to do something about it.
            </p>
            <p className="text-dark leading-relaxed mb-4 font-body">
              Our platform connects compassionate donors with verified cancer patients, ensuring 
              that funds go directly to treatment costs. We use cryptocurrency for fast, borderless 
              donations, making every contribution count.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4 font-heading">Transparency Promise</h2>
            <p className="text-dark leading-relaxed mb-4 font-body">
              We are committed to complete transparency. Every donation is tracked, every patient 
              story is verified, and 100% of donations go directly to patient treatment. We update donation progress in real-time so you can 
              see the impact of your generosity.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;