import React from 'react';
import CompanionForm from "@/components/CompanionForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {newCompanionPermissions} from "@/lib/actions/companion.action";
import Image from "next/image";
import Link from "next/link";




const NewCompanion = async () => {
    const {userId}= await auth();
    if(!userId)  redirect("/sign-in");
    const permission = await newCompanionPermissions();

    return (
        <main className={"max-md:w-2/3 min-lg:w-1/3 items-center justify-center"}>
            {permission ? (
                <article className={"w-full gap-4 "}>
                    <h1 className={"flex items-center justify-center p-4 "}>Companion builder</h1>
                    <CompanionForm/>
                </article>
            ):(
                <article className={"companion-limit"}>
                    <Image src={"/images/limit.svg"} alt={"limit"} width={500} height={500} />
                    <div className={"cta-badge"}>
                        Upgrade your plan to create more companions
                    </div>
                    <Link href={"/subscription"} className={"btn-primary w-2/3 text-center items-center justify-center"}>
                            Upgrade
                    </Link>






                </article>
            )}


        </main>
    );
};

export default NewCompanion;