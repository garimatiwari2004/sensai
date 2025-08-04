// import { parse } from "next/dist/build/swc/generated-native";
import {z} from "zod";


export const onboardingSchema=z.object({
    industry:z.string({
        required_error:"Industry is required",
    }),
    subIndustry:z.string({
        required_error:"Sub-industry is required",
    }),
    bio:z.string().max(500).optional(),
    experience:z
    .string()
    .transform((val)=>parseInt(val,10))
    .pipe(
        z
        .number()
        .min(0,"Experience must be a positive number")
        .max(50,"Experience cannot exceed 50 years")

    ),
    skills:z.string().transform((val)=>
    val
    ? val
        .split(",")
        .map((skill)=>skill.trim())
        .filter(Boolean)
        :undefined
),

});

export const contactSchema=z.object({
    email:z.string().email("Invalid email address"),
    mobile:z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
});

export const entrySchema=z.object({
    title:z.string().min(1,"Title is required"), 
    organization:z.string().min(1,"Organization is required"),
    startDate:z.string().min(1,"Start date is required"),    
    endDate:z.string().optional(),
    description:z.string().optional(),
    current:z.boolean().default(false), 

}).refine((data)=>{
    if(!data.current && !data.endDate) {
        return false;
    }
    return true;
},{
    message:"End date is required if not current",
    path:["endDate"],

}

);


export const resumeSchema=z.object({
    constactInfo:contactSchema,
    summary:z.string().min(1,"Summary is required"),
    skills:z.string().min(1,"Skills are required"),   
    experience:z.array(entrySchema),
    projects:z.array(entrySchema),
})