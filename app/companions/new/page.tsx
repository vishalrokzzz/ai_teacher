import React from 'react';
import CompanionForm from "@/components/CompanionForm";

const NewCompanion = () => {
    return (
        <main className={"max-md:w-2/3 min-lg:w-1/3 items-center justify-center"}>
            <article className={"w-full gap-4 "}>
                <h1 className={"flex items-center justify-center p-4 "}>Companion builder</h1>
                <CompanionForm/>
            </article>

        </main>
    );
};

export default NewCompanion;