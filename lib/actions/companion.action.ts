"use server";

import {auth, currentUser,clerkClient} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";
import {redirect} from "next/navigation";


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
    query = query.order("created_at", { ascending: false });
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


export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })

    if(error) throw new Error(error.message);

    return data;
}

// export const getRecentSessions = async (limit = 10) => {
//     const supabase = createSupabaseClient();
//     const { data, error } = await supabase
//         .from('session_history')
//         .select(`companions:companion_id (*)`)
//         .order('created_at', { ascending: false })
//         .limit(limit)
//
//     if(error) throw new Error(error.message);
//
//     return data.map(({ companions }) => companions);
// }
export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();


    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*), companion_id, created_at`)
        .order('created_at', { ascending: false })
        .limit(100);

    if (error) throw new Error(error.message);


    const seen = new Set();
    const uniqueCompanions = [];

    for (const row of data) {
        if (!seen.has(row.companion_id)) {
            seen.add(row.companion_id);
            uniqueCompanions.push(row.companions);
        }

        if (uniqueCompanions.length >= limit) break;
    }

    return uniqueCompanions;
};


export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}

export const getUserCompanions = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)

    if(error) throw new Error(error.message);

    return data;
}

export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    let limit = 10;

    if(await has({ plan: 'pro' })) {
        return true;
    } else if(await has({ feature: "2_active_companions_limit" })) {
        limit = 3;
    } else if(await has({ feature: "10_active_companions_limit" })) {
        limit = 10;
    }

    const { data, error } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId)

    if(error) throw new Error(error.message);

    const companionCount = data?.length;

    if(companionCount >= limit) {
        return false;
    } else {
        return true;
    }
}
