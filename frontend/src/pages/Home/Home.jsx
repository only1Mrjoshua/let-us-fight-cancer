import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import MissionVision from '../../components/MissionVision/MissionVision';
import ImpactStats from '../../components/ImpactStats/ImpactStats';
import PatientStories from '../../components/PatientStories/PatientStories';
import EmotionalStory from '../../components/EmotionalStory/EmotionalStory';
import VideoSection from '../../components/VideoSection/VideoSection';
import Testimonials from '../../components/Testimonials/Testimonials';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import DonationCTA from '../../components/DonationCTA/DonationCTA';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <MissionVision />
      <ImpactStats />
      <PatientStories />
      <EmotionalStory />
      <VideoSection />
      <Testimonials />
      <HowItWorks />
      <DonationCTA />
      <Footer />
    </main>
  );
};

export default Home;