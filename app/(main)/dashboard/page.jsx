import { getOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

const IndustrInsightsPage =async () => {
  const {isOnboarded} = await getOnboardingStatus();
  
  if(!isOnboarded){
    redirect('/onboarding');
  }
  return (
    <div>IndustrInsightsPage</div>
  )
}

export default IndustrInsightsPage;