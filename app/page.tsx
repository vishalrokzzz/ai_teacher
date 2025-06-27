import React from 'react'
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";
import {recentSessions} from "@/constants";

const Page = () => {
  return (
    <main className={"py-4"}>
      <h1 className={"p-1"}>Popular companions</h1>
        <section className={"home-section"}>
            <CompanionCard
            id="1"
            name={"ai philosopher"}
            duration={45}
            color={"#acf357"}
            subject={"philosophy"}
            topic={"existentialism"}
            />
            <CompanionCard
                id="2"
                name={"ai writer"}
                duration={46}
                color={"#e1d0fa"}
                subject={"philosophy"}
                topic={"existentialism"}
            />
            <CompanionCard
                id="3"
                name={"ai boxer"}
                duration={47}
                color={"#c6e5fc"}
                subject={"philosophy"}
                topic={"existentialism"}
            />
        </section>

        <section className={"home-section"}>
            <CompanionsList
                title={"recent companions"}
                companions={recentSessions}
                classNames={"w-2/3 max-lg:w-full"}
            />
            <Cta/>
        </section>
    </main>
  )
}

export default Page