"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DemandLevel } from "@/lib/generated/prisma";
import { GoogleGenerativeAI, GoogleGenerativeAIAbortError } from "@google/generative-ai";

const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model=genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    
});

export const generateAIInsights=async(industry)=>{
    const prompt=
    `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRange": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
    
    
    
    
    `;

    const result=await model.generateContent(prompt);
    const response=result.response;
    const text=response.text();

    const cleanedText = text.replace(/```json\s*([\s\S]*?)```/, "$1").trim();

try {
  return JSON.parse(cleanedText);
} catch (err) {
  console.error("❌ Failed to parse AI response:", cleanedText);
  throw new Error("AI response is not valid JSON");
}



};

export async function getIndustryInsight() {
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

        if(!user.industryInsight){
            const insights=await generateAIInsights(user.industry);


            const industryInsight=await db.industryInsight.create({
                data:{
                    industry: user.industry,
                    ...insights,
                    nextUpdate: new Date(Date.now() +  7* 24 * 60 * 60 * 1000), 
                }
            });
            return industryInsight;

               
        } 
        return user.industryInsight;


    
}