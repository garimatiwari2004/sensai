"use client"

import Link from 'next/link'

import React, { use, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {


  const imageRef=useRef(null);
  useEffect(() => {
    const imageElement= imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if(scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
     }
     else{
        imageElement.classList.remove("scrolled");
     }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);



  return (
    <section className='w-full pt-36 md:pt-30 pb-10'>
        <div className='space-y-6 text-center'>

            <div className='space-y-6  mx-auto'>
                <h1 className='mx-auto text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title'>
                    Your Personal AI Coach for
                    <br>
                    </br>
                    Professional Success
                </h1>
                <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                    Enhace your career with Personalised guidance, interview preparation, And 
                    AI powered tools for career success.
                </p>
            </div>
            <div className='flex justify-center space-x-4'> 
                <Link href="/dashboard">
                    <Button size="lg" className="px-8">

                        Get Started
                    </Button>
                </Link>
                <Link href="#target" scroll={true}>
                    <Button size="lg" className="px-8" variant="outline">
                        Learn More
                    </Button>
                </Link>
               
            </div>
            
            <div className='hero-image-wrapper mt-5 md:mt-0'>
                <div ref={imageRef} className='hero-image flex justify-center items-center md-mx-auto my-auto'>
                    <Image
                    src={"/image.png"}
                    width={880}
                    height={220}
                    alt="AI Coach"
                    className='border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-secondary-foreground  md:mx-auto my-auto' 
                    
                    
                    priority
                    
                    />
                </div>
            </div>


        </div>
    </section>
  )
}

export default HeroSection