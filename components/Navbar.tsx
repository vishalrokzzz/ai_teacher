// import React from 'react';
// import Link from "next/link";
// import Image from "next/image";
// import NavItems from "@/components/NavItems";
//
// const Navbar = () => {
//     return (
//         <nav className="navbar">
//             <Link href="/">
//                 <div className="logo">
//                     <Image src={"/images/logo.svg"} alt={"logo"} width={46} height={44}/>
//                 </div>
//             </Link>
//             <div className="spacer"
//                  style={{marginLeft: 'auto', display: 'flex', justifyContent: 'space-between', width: '330px'}}>
//                 <NavItems/>
//                 <div className="spacer-inner">Sign In</div>
//             </div>
//         </nav>
//     );
// };
//
// export default Navbar;
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavItems from '@/components/NavItems';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide if scrolling down, show if scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`navbar fixed top-0 left-0 w-full z-50 bg-white transition-transform duration-300 ${
            showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <Link href="/">
                <div className="logo">
                    <Image src={"/images/logo.svg"} alt={"logo"} width={46} height={44}/>
                </div>
            </Link>
            <div className="ml-auto flex items-center gap-4"
                 style={{marginLeft: 'auto', display: 'flex', justifyContent: 'space-between', width: '400px'}}>
                <NavItems/>
                <div className="flex items-center gap-2">
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
