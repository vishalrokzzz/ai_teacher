"use client"
import React, {useEffect} from 'react';
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

        if(search=="All"){
            setSearch("");
        }

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


    },[search,searchParams,path,router]);


    return (
        <div className="w-full max-w-xs">
            <Select value={search} onValueChange={setSearch}>
                <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                        <SelectItem value={subject}  key={subject}  >{subject.charAt(0).toUpperCase() + subject.slice(1)}</SelectItem>
                    ))}

                </SelectContent>
            </Select>
        </div>
    );
};

export default SubjectFilter;