import Link from 'next/link'

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
        <div className='space-y-6 text-center'>

            <div className='space-y-6 mx-auto'>
                <h1 className='gradient-title'>
                    Your Personal AI Coach for
                    <br>
                    </br>
                    Professional Success
                </h1>
                <p>
                    Enhace your career with Personalised gudance, interview preparation, And 
                    AI powered tools for career success.
                </p>
            </div>
            <div>
                <Link href="/dashboard">
                    <Button size="lg" className="px-8">

                        Get Started
                    </Button>
                </Link>
               
            </div>
            
            <div>
                <div className='relative w-full max-w-3xl mx-auto'>
                    <Image
                    src={"/image.png"}
                    width={1280}
                    height={520}
                    alt="AI Coach"
                    
                    
                    priority
                    
                    />
                </div>
            </div>


        </div>
    </section>
  )
}

export default HeroSection