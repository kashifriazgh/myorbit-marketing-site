import React from 'react';
import Navigation from './components/NavigationBar';
import Hero from './components/Hero';
import OrbitYou from './components/OrbitYou';
import PillarsShowcase from './components/PillarsShowcase';
import ReminderFeature from './components/ReminderFeature';
import AiFeatureShowcase from './components/AiFeatureShowcase';
import TargetAudience from './components/TargetAudience';
import Reviews from './components/Reviews';
import Pricing from './components/Pricing';
import FoundingMemberSection from './components/FoundingMember';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

export default function Homepage() {
  return (
    <div>
      <Navigation />
      <Hero />
      <AiFeatureShowcase />
      <OrbitYou />
      <PillarsShowcase />
      <ReminderFeature />
      <TargetAudience />
      <Reviews />
      <Pricing />
      <FoundingMemberSection />
      <ContactUs />
      <Footer />
    </div>
  );
}
