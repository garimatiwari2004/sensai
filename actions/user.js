"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";
import { DemandLevel } from "@/lib/generated/prisma";

export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) {
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
        //find if the industry exist
        //if not create it with default values will replace it with ai later
        //update the user with the industry
        const result = await db.$transaction(
            async (tx) => {
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    }
                });
                if (!industryInsight) {
                    const insights = await generateAIInsights(data.industry);


                    industryInsight = await db.industryInsight.create({
                        data: {
                            industry: data.industry,
                            salaryRange: insights.salaryRange,
                            growthRate: insights.growthRate,
                            demandLevel: DemandLevel[insights.demandLevel], // ✅ converts "High" → DemandLevel.High
                            topSkills: insights.topSkills,
                            marketOutlook: insights.marketOutlook,
                            keyTrends: insights.keyTrends,
                            recommendedSkills: insights.recommendedSkills,
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        }
                    });

                }
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    },
                });
                return { updatedUser, industryInsight };
            },
            {
                timeout: 10000, // 10 seconds timeout
            }

        );
        return { success: true, ...result };
    } catch (error) {
        console.error("Error fetching user:", error.message);
        throw new Error("Failed to fetch user data");
    }
}
export async function getOnboardingStatus(data) {
    const { userId } = await auth();
    if (!userId) {
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
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true,
            }
        });
        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.error("Error checking onboarding status:", error.message);
        throw new Error("Failed to check onboarding status");

    }
}