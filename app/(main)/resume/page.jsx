import { getResume } from '@/actions/resume';
import React from 'react'
import ResumeBuilder from './_components/resumebuilder';

const resumePage = async () => {
    const resume=await getResume();
  return (
    <div className='container mx-auto p-4'>
        <ResumeBuilder initialContent={resume?.content}/>
    </div>
  )
}

export default resumePage