import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

export async function saveResume(content) {
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
        const resume = await db.resume.upsert({
            where: {
                userId: user.id,

            },
            update: {
                content,
            },
            create: {
                userId: user.id,
                content,
            },

        });
        revalidatePath("/resume");
        return resume;

    } catch (error) {
        console.error("Error saving resume: ", error);
        throw new Error("Failed to save resume");

    
    }
}


export async function getResume(content) {
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

   return await db.resume.findUnique({
    where:{
        userId: user.id,
    },
   });
}

export async function improveWithAi({current,type}) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
        include:{
            industryInsight:true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }

    const prompt= `
    You are an expert in resume writing.
    Improve the following ${type} based on the latest industry standards and insights for a ${user.industry} professional.
    Make it more impactful, quantifiable, and tailored to the job market.
    Current content: '${current}'

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Tailor to the ${user.industry} industry
    4. Ensure clarity and conciseness
    5. Focus on achievements and skills relevant to the ${user.industry} industry
    6. Use industry-specific terminology and insights and keywords

    Format the response as a single paragraph without any additional text or explanations
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const improvedContent =  response.text().trim();
        return improvedContent;
    } catch (error) {
        console.error("Error improving with AI: ", error);
        throw new Error("Failed to improve content with AI");
        
    }
    

}