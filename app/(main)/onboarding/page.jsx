import { getOnboardingStatus } from '@/actions/user';
import { industries } from '@/components/data/industries';
import { redirect } from 'next/navigation';

import OnboardingForm from './_components/onboardingform';

const OnboardingPage = async() => {
  const {isOnboarded}=await getOnboardingStatus();
  if(isOnboarded){
    redirect('/dashboard');
  }
  return (
    <main>
        <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;