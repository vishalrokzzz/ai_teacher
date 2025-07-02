"use client"
import React from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {subjects} from "@/constants";
import {Textarea} from "@/components/ui/textarea";
import {createCompanion} from "@/lib/actions/companion.action";
import {redirect} from "next/navigation";


const formSchema = z.object({
    name: z.string().min(2).max(50,{message: 'Companion name is required'}),
    subject: z.string().min(2).max(50,{message: 'Companion Subject is required'}),
    topic: z.string().min(2).max(50,{message: 'Companion topic is required'}),
    voice: z.string().min(2).max(50,{message: 'Companion voice is required'}),
    style: z.string().min(2).max(50,{message: 'Companion style is required'}),
    duration: z.coerce.number().min(1).max(50,{message: 'Companion duration is required'}),
    // language: z.string().min(2).max(50,{message: 'Companion language is required'}),
})

const CompanionForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            subject:"",
            topic:"",
            voice:"",
            style:"",
            duration:0,
            // language:"english",
        },
    })

    // 2. Define a submit handler.
    const onSubmit=async (values: z.infer<typeof formSchema>)=> {
        const companion= await createCompanion(values);
        if (companion){
            redirect(`/companions/${companion.id}`);
        }else{
            console.log("failed to create companion");
            redirect(`/`);
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input placeholder="enter the companion name" {...field} className={"input"}/>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Subject</FormLabel>
                            <FormControl>
                                <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px] input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem value={subject} key={subject} className={"capitalize"}>
                                                {subject}
                                            </SelectItem>
                                        ))}


                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Ex: linear algebra, locus" {...field} className={"input"}/>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>How should the tutor sound?</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px] input capitalize">
                                        <SelectValue placeholder="Select the voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"male"}>Male</SelectItem>
                                        <SelectItem value={"female"}>Female</SelectItem>


                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}>
                                    <SelectTrigger className="w-[180px] input capitalize">
                                        <SelectValue placeholder="Select the style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"formal"}>Formal</SelectItem>
                                        <SelectItem value={"casual"}>Casual</SelectItem>


                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated session duration</FormLabel>
                            <FormControl>
                                <Input  type={"number"} placeholder="15" {...field} className={"input"}/>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />



                <Button type="submit" className={"w-full cursor-pointer"}>Build</Button>
            </form>
        </Form>
    );
};

export default CompanionForm;