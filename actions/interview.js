"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model=genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    
});


export async function generateQuiz(){
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
       try{  const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  
    const result=await model.generateContent(prompt);
    const response=result.response;
    const text=response.text();

    const cleanedText = text.replace(/```json\s*([\s\S]*?)```/, "$1").trim();
    const quiz=JSON.parse(cleanedText);

    return quiz.questions;
}catch(error){
  console.error("Error generating Quix: ", error);
  throw new Error("Failed to generate quiz");

}

    

}

export async function saveQuizResult(questions,answers,score) 
{
    const {userId}=await auth();
    if(!userId) throw new Error("Unauthorised");
    const user=await db.user.findUnique({
        where:{
            clerkUserId: userId,
        },
    });
    if(!user) throw new Error("User NOt Found");

    const questionResults=questions.map((q,index)=>({
        question:q.question,
        answer:q.correctAnswer,
        userAnswer:answers[index],
        isCorrect:q.correctAnswer===answers[index],
        explanation:q.explanation,

    }));

    const wrongAnswers=questionResults.filter((q)=>!q.isCorrect);
    if(wrongAnswers.length>0){
        const wrongQuestionsText=wrongAnswers.map(
            (q)=>
                `Question: "${q.question}"\nCorrect Aanswer: "${q.answer}"\nUser answer: "${q.userAnswer}"`
        )
        .join("\n\n");
        
        const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;
    try {
      const tipResult = await model.generateContent(improvementPrompt);

      improvementTip = tipResult.response.text().trim();
      console.log(improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
    }
    try {
        const assessment=await db.assessment.create({
            data:{
                userId:user.id,
                quizScore:score,
                questions:questionResults,
                category:"Technical",
                improvementTip,
            },

        });
        return assessment;
        
    } catch (error) {
        console.error("Error saving quiz results: ",error);
        throw new Error("failer to save quiz results");
        
    }
    
}