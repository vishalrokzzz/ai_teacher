import React from 'react';
import {getCompanion} from "@/lib/actions/companion.action";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import CompanionCard from "@/components/CompanionCard";
import Image from "next/image";
import {getSubjectColor} from "@/lib/utils";

interface CompanionSessionPageProps {
    params: Promise<{id:string}>;

}


const CompanionSession = async ({ params }:CompanionSessionPageProps )=> {
    const {id}=await params;
    const companion=await getCompanion(id);
    const user=currentUser();

    if (!user) redirect("/sign-in");
    if(!companion) redirect("/companions");

    console.log(companion);
    return (
        <main className="py-19" >
            <article className="flex rounded-border justify-between p-6 max-md:flex-col" style={{
                background: `linear-gradient(to right, ${getSubjectColor(companion.subject)}, transparent)`
            }}>
                <div className="flex items-center gap-2">
                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(companion.subject)}}>
                        <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={35} height={35} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-2xl">
                                {companion.name}
                            </p>
                            <div className="subject-badge max-sm:hidden">
                                {companion.subject}
                            </div>
                        </div>
                        <p className="text-lg">{companion.topic}</p>
                    </div>
                </div>
                <div className="items-start text-2xl max-md:hidden">
                    {companion.duration} minutes
                </div>
            </article>
        </main>
    );
};

export default CompanionSession;