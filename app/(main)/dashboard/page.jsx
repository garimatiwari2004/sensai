import { getIndustryInsight } from '@/actions/dashboard';
import { getOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'
import DashboardView from './_components/dashboardview';
import Layout from './_components/layout';

const IndustrInsightsPage =async () => {
  const {isOnboarded} = await getOnboardingStatus();
  const insights= await getIndustryInsight();
  
  if(!isOnboarded){
    redirect('/onboarding');
  }
  return (
    <Layout>
    <div className='container mx-auto'>
      <DashboardView insights={insights}/>
    </div>
    </Layout>
  );
}

export default IndustrInsightsPage;