import React from 'react';
import Navigation from './components/NavigationBar';
import Motivation from './components/Motivation';
import HeroSection from './components/HeroSection';
import TargetAudience from './components/TargetAudience';
import Pricing from './components/Pricing';
import DescriptiveParagraph from './components/DescriptiveParagraph';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import DetailedBenefits from './components/DetailedBenefits';
import Reviews from './components/Reviews';
import FoundingMemberSection from './components/FoundingMember';
import InteractiveDemos from './components/InteractiveDemos';
import FounderStorySection from './components/FounderStory';

export default function Homepage() {
  return (
    <div>
      <Navigation />
      <Motivation />
      <HeroSection />
      <InteractiveDemos />
      <FounderStorySection />
      
      <DescriptiveParagraph />
      {/* <KeyBenefits /> */}
      <DetailedBenefits />
      <TargetAudience />
      <Reviews />
      <Pricing />
      <FoundingMemberSection />
      <ContactUs />
      <Footer />

    </div>
  );
}
