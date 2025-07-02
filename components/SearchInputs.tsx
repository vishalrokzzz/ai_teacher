'use client';

import React, {useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";


const SearchInputs = () => {
    const path=usePathname();
    const router=useRouter();
    const searchParams=useSearchParams();
    const query=searchParams.get("topic") || "";

    const [search,setSearch]=useState("");

    useEffect(() =>{

        const delayDebounceFn = setTimeout(() => {
            if (search){
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: search,
                });

                router.push(newUrl,{scroll: false});

            }else if(path==="/companions"){
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["topic"],
                });

                router.push(newUrl, { scroll: false });
            }

        },500)




    },[searchParams,router,search,path]);


    return (
        <div className={"relative border border-gray-200 rounded-lg items-center flex gap-2 px-2 py-1 h-fit"}>
            <Image src={"/icons/search.svg"} alt={"search"} height={15} width={15}/>
            <input
                placeholder={"Search in companions"}
                className={"outline-none rounded-lg"}
                onChange={(e)=>setSearch(e.target.value)}
                value={search}
            />

        </div>
    );
};

export default SearchInputs;