"use client"
import React, {useEffect} from 'react';
import Image from "next/image";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import {subjects} from "@/constants";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = React.useState('');
    const path=usePathname();

    useEffect(() => {

        const useDelay=setTimeout(()=>{
            if (search){
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "subject",
                    value: search,
                });

                router.push(newUrl);
            }else if (path==="/companions"){
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["subject"],
                });

                router.push(newUrl, { scroll: false });
            }
        },0)


    })


    return (
        <div className="w-full max-w-xs">
            <Select value={search} onValueChange={setSearch}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                    {/*<SelectItem value="">All Subjects</SelectItem>*/}
                    {subjects.map((subject) => (
                        <SelectItem value={subject}  key={subject}  >{subject}</SelectItem>
                    ))}

                </SelectContent>
            </Select>
        </div>
    );
};

export default SubjectFilter;