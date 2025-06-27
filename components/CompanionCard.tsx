import React from 'react';
import Image from "next/image";
import Link from "next/link";

interface CompanionCardProps {
    name: string;
    id: string;
    subject: string;
    topic: string;
    duration: number;
    color: string;
}

const CompanionCard = ({id,name,topic,color,subject,duration}:CompanionCardProps) => {
    return (
        <article className={"companion-card"} style={{backgroundColor: color}}>
            <div className={"flex justify-between items-center"}>
                <div className={"subject-badge"}>{subject}</div>
                <button  className={"companion-bookmark"}>
                    <Image src={"/icons/bookmark.svg"} alt={"bookmark"}
                           width={12.5} height={15}/>
                </button>
            </div>
            <h2 className={"text-2xl font-bold"}>{name}</h2>
            <p className={"text-lg"}>{topic}</p>
            <div className={"flex items-center gap-2"}>
                <Image src={"/icons/clock.svg"} alt={"clockImage"} width={12.5} height={15}/>
                <p className={"text-sm"}>{duration} minutes</p>
            </div>
            <Link href={`/companions/${id}`} className={"w-full "}>
                <button className={"w-full btn-primary justify-center"}>Launch Companion</button>
            </Link>





        </article>
    );
};

export default CompanionCard;