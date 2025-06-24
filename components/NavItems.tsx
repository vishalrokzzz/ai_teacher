import React from 'react';
import Link from "next/link";

const navItems=[
    {label:"Home",href:"/"},
    {label:"Companions",href:"/companions"},
    {label:"My-Journey",href:"/my-journey"},
    {label:"Profile",href:"/profile"}
    ]

const NavItems = () => {
    return (
        <nav className="flex items-center gap-4">
            {navItems.map(({label,href}) => (
                <Link href={href} key={label}>
                    {label}
                </Link>
                ))}

        </nav>
    );
};

export default NavItems;