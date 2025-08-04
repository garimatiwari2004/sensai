import { getIndustryInsight } from '@/actions/dashboard';
import { getOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'
import DashboardView from './_components/dashboardview';
import Layout from './layout';

const IndustrInsightsPage =async () => {
  const {isOnboarded} = await getOnboardingStatus();
  
  
  if(!isOnboarded){
    redirect('/onboarding');
  }

  const insights= await getIndustryInsight();
  return (
    <Layout>
    <div className='container mx-auto'>
      <DashboardView insights={insights}/>
    </div>
    </Layout>
  );
}

export default IndustrInsightsPage;