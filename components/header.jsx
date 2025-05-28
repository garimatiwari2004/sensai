import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard } from 'lucide-react';
import {Button} from './ui/button';

const Header = () => {
  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
        <nav className='container mx-auto px-4 flex items-center justify-between'>
            <Link href="/">
               <Image src="/logo.png" alt="Logo" width={150} height={50} 
               className='h-18 py-1 w-a object-contain'/>
            </Link>
            <div>
                <SignedIn>
                    <Link href="/dashboard">
                    <Button>
                        <LayoutDashboard className=' h-4 w-4' />
                        <span className='hidden md:block'>
                        Industry Insights
                        </span>
                    </Button>
                    </Link>

                </SignedIn>        
            </div>
        </nav>

    <div><SignedOut>
              <SignInButton />

        </SignedOut>
        <SignedIn>
              <UserButton />
        </SignedIn>
    </div>
    </header>
  )
}

export default Header;