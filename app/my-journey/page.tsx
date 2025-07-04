import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getUserCompanions, getUserSessions} from "@/lib/actions/companion.action";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const ProfilePage = async () => {
    const user = await currentUser();
    if (!user) return redirect("/sign-in");
    const companions = await getUserCompanions(user.id);
    const sessionHistory = await getUserSessions(user.id);



    return (
        <main className={"min-lg:w-3.4"}>
            <section className={"flex justify-between gap-4 max-sm:flex-col items-center"}>
                <div className={"flex gap-4 items-center"}>
                    <Image src={user.imageUrl} alt={user.firstName} width={110} height={110} />
                    <div className={"flex flex-col gap-2"}>
                        <h1 className={"font-bold text-2xl"}>{user.firstName} {user.lastName}</h1>
                        <p className={"text-sm text-muted-foreground"}>{user.emailAddresses[0].emailAddress}</p>
                    </div>

                </div>
                <section className={"flex gap-4"}>
                    <div className={"border border-gray-300 rounded-lg p-4  gap-2 shadow-sm flex flex-col h-fit"}>
                        <div className={"flex items-center gap-2"}>
                            <Image src={"/icons/check.svg"} alt={"CheckMark"} width={20} height={20} />
                            <p className={"text-sm"}>{sessionHistory.length}</p>
                        </div>
                        <div>
                            <p className={"text-sm"}>Lessons Completed</p>
                        </div>
                    </div>
                    <div className={"border border-gray-300 rounded-lg p-4  gap-2 shadow-sm flex flex-col h-fit"}>
                        <div className={"flex items-center gap-2"}>
                            <Image src={"/icons/cap.svg"} alt={"capMark"} width={20} height={20} />
                            <p className={"text-sm"}>{companions?.length}</p>
                        </div>
                        <div>
                            <p className={"text-sm"}>Companions Created</p>
                        </div>
                    </div>

                </section>


            </section>
            <Accordion type="multiple">
                <AccordionItem value="recent">
                    <AccordionTrigger className={"text-2xl font-bold"}>Recent Sessions</AccordionTrigger>
                    <AccordionContent>
                        <CompanionsList
                            title={"Recent Sessions"}
                            companions={sessionHistory}
                            classNames={"w-2/3 max-lg:w-full"}
                        />
                    </AccordionContent>
                </AccordionItem>



                <AccordionItem value="companions">
                    <AccordionTrigger className={"text-2xl font-bold"}>My Companions {`(${companions?.length})`}</AccordionTrigger>
                    <AccordionContent>
                        <CompanionsList
                            title={"My Companions"}
                            companions={companions}
                            classNames={"w-2/3 max-lg:w-full"}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </main>
    );
};

export default ProfilePage;