import React from 'react';
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";

const Navbar = () => {
    return (
        <nav className="navbar">

            <Link href="/">
                <div className="logo">
                    <Image src={"/images/logo.svg"} alt={"logo"} width={46} height={44}/>
                </div>
            </Link>
            <div className="spacer"
                 style={{marginLeft: 'auto', display: 'flex', justifyContent: 'space-between', width: '330px'}}>
                <NavItems/>
                <div className="spacer-inner">Sign In</div>
            </div>
        </nav>
    );
};

export default Navbar;