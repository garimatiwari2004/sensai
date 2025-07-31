"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, set } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QuizResult from "./quizresult";

const QuizList = ({ assessments }) => {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="gradient-title text-3xl md:text-4xl">
              Recent Quizes
            </CardTitle>
            <CardDescription>Review your quiz performance</CardDescription>
          </div>

          <Button
            onClick={() => router.push("/interview/mock")}
            className="mt-4"
          >
            Start new Quiz
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment, i) => {
              return (
                <Card
                  className="cursor-pointer hover:bg-muted/90 transition-colors"
                  key={assessment.id || i}
                  onClick={() => setSelectedQuiz(assessment.id)}
                >
                  <CardHeader>
                    <CardTitle>Quiz {i + 1}</CardTitle>
                    <CardDescription>
                      <div>Score:{assessment.quizScore.toFixed(1)}%</div>
                      <div>
                        {format(
                          new Date(assessment.createdAt),
                          "MMM dd, yyyy HH:mm"
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizList;
