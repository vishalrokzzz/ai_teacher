"use server";

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";

//create a companion

export const createCompanion = async (formData: CreateCompanion) =>{
    const {userId : author} = await auth();
    const supabase = createSupabaseClient();

    const {data,error} = await supabase.from("companions").insert({...formData,author}).select();
    if (error || !data) throw new Error(error?.message || "failed to create a companion");

    return data[0];
}




//get companions with any filter

export const getALLCompanions = async ({limit=10,page=1,subject,topic}:GetAllCompanions  ) =>{

    const supabase = createSupabaseClient();
    let query = supabase.from("companions").select();
    if (subject && topic){
        query = query.ilike('subject',`%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)

    }else if (subject) {
        query = query.ilike("subject", `%${subject}%`);
    }else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query= query.range((page-1)*limit,page*limit - 1);
    const {data:companions, error} = await query;
    if (error || !companions) throw new Error(error?.message || "failed to create a companion");
    return companions;
}

export const getCompanion=async (id: string) =>{
    const supabase = createSupabaseClient();
    const {data:companion,error} = await supabase.from("companions").select().eq("id",id).single();
    if (error || !companion) throw new Error(error?.message || "failed to fetch the companion with id");
    return companion;
}