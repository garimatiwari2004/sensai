import { industries } from '@/components/data/industries';
import React from 'react';

const OnboardingPage = () => {
  return (
    <main>
        <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;