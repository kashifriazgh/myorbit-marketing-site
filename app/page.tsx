import React from 'react';
import Navigation from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import KeyBenefits from './components/KeyBenefits';
import TargetAudience from './components/TargetAudience';
import Pricing from './components/Pricing';
import DescriptiveParagraph from './components/DescriptiveParagraph';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import SchedulePreview from './components/utilComponents/KeyBenefits/SchedulePreview';
import DetailedBenefits from './components/DetailedBenefits';
import Reviews from './components/Reviews';
import CreateDocumentButton from './components/test';
export default function Homepage() {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <DescriptiveParagraph />
      <KeyBenefits />
      <DetailedBenefits />
      <TargetAudience />
      <Reviews />
      <Pricing />
      <ContactUs />
      <Footer />
      <CreateDocumentButton />
    </div>
  );
}
