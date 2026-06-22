import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import logoIcon from '../../assets/images/logo.png'; // Import the logo icon

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer id="footer" className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={logoIcon} 
                alt="Let Us Fight Cancer Icon" 
                className="h-10 w-10 brightness-0 invert" 
              />
              <span className="text-xl font-bold text-white font-heading">
                Let Us Fight Cancer
              </span>
            </div>
            <p className="text-neutral-gray leading-relaxed mb-6 font-body">
              We're dedicated to connecting cancer patients with compassionate donors, 
              ensuring no one fights cancer alone due to financial limitations.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                  aria-label={`Follow us on ${Icon.name}`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-heading">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Patient Stories', 'How It Works', 'Success Stories', 'Donate', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-neutral-gray hover:text-primary-medium transition-colors font-body">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

            {/* Contact */}
            <div>
            <h3 className="text-lg font-bold mb-6 font-heading">Contact Us</h3>
            <ul className="space-y-4">
                <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-medium flex-shrink-0 mt-1" aria-hidden="true" />
                <span className="text-neutral-gray font-body">
                    123 Hope Street, Suite 100<br />
                    New York, NY 10001<br />
                    United States
                </span>
                </li>
                <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-medium flex-shrink-0" aria-hidden="true" />
                <span className="text-neutral-gray font-body">+1 (800) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-medium flex-shrink-0" aria-hidden="true" />
                <span className="text-neutral-gray font-body">info@letusfightcancer.com</span>
                </li>
            </ul>
            </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-heading">Stay Updated</h3>
            <p className="text-neutral-gray mb-4 font-body">
              Subscribe to receive updates on patients and impact stories.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-4 py-2 bg-white bg-opacity-10 rounded-lg text-white placeholder-neutral-gray border border-white border-opacity-10 focus:outline-none focus:border-primary-medium font-body"
                aria-label="Email for newsletter"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary-dark rounded-lg hover:bg-opacity-90 transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white border-opacity-10 text-center">
          <p className="text-neutral-gray font-body">
            &copy; {new Date().getFullYear()} Let Us Fight Cancer. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;