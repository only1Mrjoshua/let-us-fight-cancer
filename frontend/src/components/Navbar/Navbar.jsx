import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScrollTo } from '../../hooks/useScrollTo';
import logoIcon from '../../assets/images/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToSection } = useScrollTo();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', sectionId: 'home', path: '/' },
    { label: 'About', sectionId: 'mission', path: '/' },
    { label: 'Patients', sectionId: 'patients', path: '/' },
    { label: 'Success Stories', sectionId: 'testimonials', path: '/' },
    { label: 'Donate', path: '/donate' },
    { label: 'Contact', sectionId: 'footer', path: '/' },
  ];

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    
    // If it's the Donate page, navigate to /donate
    if (item.path === '/donate') {
      navigate('/donate');
      return;
    }
    
    // If we're not on the home page, navigate to home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToSection(item.sectionId);
      }, 100);
    } else {
      // If already on home page, just scroll
      scrollToSection(item.sectionId);
    }
  };

  const handleDonateClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/donate');
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo - Icon + Text */}
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={handleLogoClick}
          >
            <img 
              src={logoIcon} 
              alt="Let Us Fight Cancer Icon" 
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="text-base md:text-lg lg:text-xl font-bold text-primary-dark font-heading whitespace-nowrap">
              Let Us Fight Cancer
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="px-3 py-2 text-sm font-medium text-dark hover:text-primary-dark transition-colors duration-200 font-body"
              >
                {item.label}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDonateClick}
              className="ml-4 px-6 py-2 bg-primary-dark text-white rounded-full font-semibold text-sm hover:bg-opacity-90 transition-all duration-200 shadow-lg font-body"
            >
              Donate Now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark hover:text-primary-dark transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glassmorphism"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Mobile Logo */}
              <div className="flex items-center gap-2 pb-3 mb-2 border-b border-primary-light">
                <img 
                  src={logoIcon} 
                  alt="Let Us Fight Cancer Icon" 
                  className="h-6 w-6"
                />
                <span className="text-sm font-bold text-primary-dark font-heading">
                  Let Us Fight Cancer
                </span>
              </div>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left px-3 py-2 text-dark hover:text-primary-dark font-body transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleDonateClick}
                className="w-full mt-2 px-6 py-3 bg-primary-dark text-white rounded-full font-semibold text-center hover:bg-opacity-90 transition-all font-body"
              >
                Donate Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;