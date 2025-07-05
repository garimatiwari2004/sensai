"use server";

import { DemandLevel } from "@/lib/generated/prisma";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updateUser(data) {
    const {userId}=await auth();
    if(!userId){
        throw new Error("User not authenticated"); 
    }

    const user = await data.db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }

    try{
        //find if the industry exist
        //if not create it with default values will replace it with ai later
        //update the user with the industry
        const result=await db.$transaction(
            async(tx)=>{ 
                let industryInsights=await tx.industryInsight.findUnique({ 
                    where:{
                        industry:data.industry,
                    }
             } );
             if(!industryInsights){
                industryInsights=await tx.industryInsight.create({
                    data:{
                        industry: data.industry,
                        salaryRange:[],
                        growthRate: 0,
                        demandLevel:"Medium",
                        TopSkills:[],
                        marketOutlook: "Neutral",
                        keyTrends:[],
                        recommendedSkills:[],
                        nextUpdate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                    }
                });
             }  
             const updatedUser=await tx.user.update({
                where:{
                    id: user.id,
                },
                data:{
                    industry: data.industry,
                    experience: data.experience,
                    bio: data.bio,
                    skills:data.skills,
                },
              });
              return {updatedUser, industryInsights};
            },
            {
                timeout: 10000, // 10 seconds timeout
            }

        );
        return result.user;
    }catch(error){
        console.error("Error fetching user:", error.message);
        throw new Error("Failed to fetch user data"); 
    }
}
export async function getOnboardingStatus(data) {
    const {userId}=await auth();
    if(!userId){
        throw new Error("User not authenticated"); 
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }

    try {
        const user=await db.user.findUnique({
            where:{
                clerkUserId: userId,
            },
            select:{
                industry:true,
            }
        });
        return{
            isOnboarded:!!user?.industry,
        };
    } catch (error) {
        console.error("Error checking onboarding status:", error.message);
        throw new Error("Failed to check onboarding status");
        
    }
}