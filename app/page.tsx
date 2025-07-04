import React from 'react'
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";
import {getALLCompanions, getRecentSessions} from "@/lib/actions/companion.action";
import {getSubjectColor} from "@/lib/utils";

const Page = async () => {


    const companions=await getALLCompanions({limit: 3});
    const recentSessionCompanions=await getRecentSessions();


  return (
    <main>
      <h1 className={"p-1"}>Popular companions</h1>



        <section className={"home-section"}>
            {
                companions?.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))
            }


        </section>

        <section className={"home-section"}>
            <CompanionsList
                title={"recent companions"}
                companions={recentSessionCompanions}
                classNames={"w-2/3 max-lg:w-full"}
            />
            <Cta/>
        </section>
    </main>
  )
}

export default Page