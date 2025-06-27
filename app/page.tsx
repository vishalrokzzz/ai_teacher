import React from 'react'
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";

const Page = () => {
  return (
    <main>

      <h1 className="text-2xl">Popular companions</h1>
        <section className={"home-section"}>
            <CompanionCard
            id="1"
            name={"ai philosopher"}
            duration={45}
            color={"#amc35"}
            subject={"philosophy"}
            topic={"existentialism"}
            />
            <CompanionCard
                id="2"
                name={"ai writer"}
                duration={46}
                color={"#kgu54"}
                subject={"philosophy"}
                topic={"existentialism"}
            />
            <CompanionCard
                id="3"
                name={"ai boxer"}
                duration={47}
                color={"#xrk67"}
                subject={"philosophy"}
                topic={"existentialism"}
            />
        </section>
        <h1 className={"text-2xl"}>Companions available</h1>
        <section className={"home-section"}>
            <CompanionsList/>
            <Cta/>
        </section>
    </main>
  )
}

export default Page