import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Cta = () => {
    return (
        <article className={"cta-section"}>
            <div className={"cta-badge"}>Start learning your way</div>
            <div>
                <h1>Build a personalized companion</h1>
                <h4>Pick a name, subject, voice, & personality
                    — and start learning through voice
                    conversations that feel natural and fun.</h4>
            </div>
            <div>
                <Image src={"/images/cta.svg"} alt={"logo"} width={400} height={400} />
            </div>
            <div className={"flex w-full "}>
                <Button className={"bg-blue-600 text-white px-4 py-2 rounded btn-primary w-full"}>
                    <Image src={"/icons/plus.svg"} alt={"plus"} width={20} height={20} />
                    <Link href={"/companions/new"}>
                        <span >Build new companion</span>
                    </Link>

                </Button>
            </div>
        </article>
    );
};

export default Cta;