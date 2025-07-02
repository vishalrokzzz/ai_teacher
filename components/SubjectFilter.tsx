"use client"
import React, {useEffect} from 'react';
import Image from "next/image";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

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
        },400)


    })


    return (
        <div className={"relative border border-gray-200 rounded-lg items-center flex gap-2 px-2 py-1 h-fit"}>
            <Image src={"/icons/search.svg"} alt={search} height={15} width={15}/>
            <input
                   placeholder={"Search in Subjects"}
                   className={"border-none outline-none rounded-lg"}
                   onChange={(e) => setSearch(e.target.value)}
                   value={search}
            />



        </div>
    );
};

export default SubjectFilter;