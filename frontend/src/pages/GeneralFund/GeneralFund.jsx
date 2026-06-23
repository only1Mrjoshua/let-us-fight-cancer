import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Shield, Copy, Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CopyButton from '../../components/CopyButton/CopyButton';

// Hardcoded crypto addresses
const CRYPTO_ADDRESSES = {
  bitcoin: "bc1ppwfe72mz7sj7yeg76evhghmzfye5rkrmuwwrj9znntzfpdmydf3smxf4x8",
  usdt: "TJP65KbZj5SwKCfFJuiHcqwcyM45F6LQgE",
  bnb: "0x97274e58fbba80198bd0ce5490caafd363806e2a",
};

const GeneralFund = () => {
  const navigate = useNavigate();

  return (
    <main>
      <Navbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <button
          onClick={() => navigate('/donate')}
          className="flex items-center gap-2 text-primary-dark hover:text-primary-dark hover:text-opacity-80 transition-colors font-body font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Patients
        </button>
      </div>

      {/* Thank You Message */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-10 h-10 text-primary-dark" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-dark mb-6 font-heading">
              Thank You for Your Heart
            </h1>
            
            <div className="bg-neutral-light rounded-2xl p-8 mb-8">
              <p className="text-lg text-dark leading-relaxed font-body mb-4">
                Every donation, no matter the size, is a lifeline to someone fighting cancer. 
                When you give, you're not just sending money, you're sending hope to a mother 
                who wants to see her children grow up, a father who dreams of walking his daughter 
                down the aisle, a child who deserves a chance at life.
              </p>
              <p className="text-lg text-dark leading-relaxed font-body mb-4">
                Your generosity becomes chemotherapy sessions, radiation treatments, surgeries, 
                and medications. It becomes tears of relief when a family learns they can afford 
                the treatment that will save their loved one's life.
              </p>
              <p className="text-lg text-dark leading-relaxed font-body">
                From the bottom of our hearts, and from every patient and family you help, 
                <strong className="text-primary-dark"> thank you.</strong> You are the reason 
                hope exists. You are the reason people fight on.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Details */}
      <section className="py-12 bg-neutral-light">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8 text-center font-heading">
              Send Your Donation
            </h2>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-primary-light">
              {/* Crypto Donations */}
              <h3 className="text-lg font-bold text-dark mb-4 font-heading flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Crypto Donations
              </h3>
              
              <p className="text-sm text-neutral-gray mb-6 font-body">
                Send your donation via any of these networks. Your contribution goes directly 
                to funding cancer treatments for patients in need.
              </p>

              {/* Bitcoin */}
              <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                <p className="text-sm font-bold text-dark mb-2 font-heading">
                  Bitcoin (BTC)
                </p>
                <div className="bg-white rounded-lg p-3 mb-2 break-all">
                  <p className="text-xs text-dark font-mono">{CRYPTO_ADDRESSES.bitcoin}</p>
                </div>
                <CopyButton text={CRYPTO_ADDRESSES.bitcoin} label="Copy BTC Address" />
              </div>

              {/* USDT TRC20 */}
              <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                <p className="text-sm font-bold text-dark mb-2 font-heading">
                  USDT (TRC20)
                </p>
                <div className="bg-white rounded-lg p-3 mb-2 break-all">
                  <p className="text-xs text-dark font-mono">{CRYPTO_ADDRESSES.usdt}</p>
                </div>
                <CopyButton text={CRYPTO_ADDRESSES.usdt} label="Copy USDT Address" />
              </div>

              {/* BNB */}
              <div className="mb-4 p-4 bg-neutral-light rounded-xl">
                <p className="text-sm font-bold text-dark mb-2 font-heading">
                  BNB (BSC)
                </p>
                <div className="bg-white rounded-lg p-3 mb-2 break-all">
                  <p className="text-xs text-dark font-mono">{CRYPTO_ADDRESSES.bnb}</p>
                </div>
                <CopyButton text={CRYPTO_ADDRESSES.bnb} label="Copy BNB Address" />
              </div>

              {/* Trust Badge */}
              <div className="mt-6 text-center">
                <p className="text-xs text-neutral-gray font-body flex items-center justify-center gap-1">
                  <Shield className="w-4 h-4 text-primary-dark" />
                  100% of donations go directly to patient treatment
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Contact */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-primary-light bg-opacity-30 rounded-2xl p-8 text-center"
          >
            <Mail className="w-12 h-12 text-primary-dark mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark mb-3 font-heading">
              Need Help or Alternative Payment?
            </h3>
            <p className="text-neutral-gray mb-4 font-body">
              If you're unable to use the crypto payment methods above or need guidance 
              on how to donate, we're here to help. Reach out to us and we'll walk you 
              through every step.
            </p>
            <a 
              href="mailto:donations@letusfightcancer.com?subject=General%20Fund%20Donation%20Inquiry"
              className="inline-flex items-center gap-2 bg-primary-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all font-body shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Contact Us for Help
            </a>
            <p className="text-sm text-neutral-gray mt-4 font-body">
              Email: <strong className="text-primary-dark">donations@letusfightcancer.com</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final Thank You */}
      <section className="py-16 bg-gradient-to-br from-primary-light via-primary-medium to-primary-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
              You Are Making a Difference
            </h2>
            <p className="text-xl text-white text-opacity-90 font-body">
              Every single donation brings us closer to a world where no one fights 
              cancer alone. Thank you for being part of this mission.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default GeneralFund;