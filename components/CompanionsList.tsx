import React from 'react';
import {
    Table,
    TableBody,

    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {cn, getSubjectColor} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
interface CompanionsListProps{
    title: string;
    companions?: Companion[];
    classNames?: string;
}


const CompanionsList = ({title,companions,classNames}:CompanionsListProps) => {
    return (
        <article className={cn("companions-list border border-gray-300 rounded-2xl p-4 shadow-sm", classNames)}>
            <h1>Recently completed lessons</h1>
            <Table className="border-separate border-spacing-0">

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/3 text-lg">Lessons</TableHead>

                        <TableHead className={"text-lg"}>Subject</TableHead>
                        <TableHead className="text-right text-lg">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map((companion) => (
                        <TableRow key={companion.id}>

                            <TableCell
                                className="font-medium w-2/3 relative overflow-hidden rounded-2xl"
                                style={{
                                    background: `linear-gradient(to right, ${getSubjectColor(companion.subject)}, transparent)`
                                }}
                            >
                                <Link href={`/companions/${companion.id}`}>
                                    <div className="flex items-center gap-4 py-2">
                                        {/* Icon and Info */}
                                        <div
                                            className="size-[75px] flex items-center justify-center rounded-lg max-md:hidden"
                                            style={{ backgroundColor: getSubjectColor(companion.subject) }}
                                        >
                                            <Image
                                                src={`/icons/${companion.subject}.svg`}
                                                alt="subject image"
                                                width={30}
                                                height={30}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-2xl font-bold">{companion.name}</p>
                                            <p className="text-lg">{companion.topic}</p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>

                            <TableCell><div className={"subject-badge w-fit max-md:hidden "}>{companion.subject}</div></TableCell>
                                <TableCell>
                                    <div className={"flex items-center gap-2 w-full justify-end"}>
                                        {companion.duration} {" "} <span className="max-md:hidden">minutes</span>
                                        <Image src={"/icons/clock.svg"} alt={"clock"} height={20} width={20} className={"max-md:hidden"}/>

                                    </div>
                                </TableCell>

                        </TableRow>

                    ))}

                </TableBody>
            </Table>


        </article>
    );
};

export default CompanionsList;