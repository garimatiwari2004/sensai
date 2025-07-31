import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Car,
  CheckCircle,
  Circle,
  Trophy,
  XCircle,
  XCircleIcon,
} from "lucide-react";
import React from "react";

const QuizResult = ({ result, hideStartNew = false, onStartNew }) => {
   if (!result || !Array.isArray(result.questions)) {
    return null;
   }

  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-2xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">
            {typeof result.quizScore === "number"
              ? `${result.quizScore.toFixed(1)}%`
              : "N/A"}
          </h3>{" "}
          <Progress value={result.quizScore} max={100} className="w-full" />
        </div>

        {result.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>
          {result.questions.map((q, index) => (
            <div className="border rounded-lg p-4 space-y-2" key={index}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p> Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct Answer: {q.answer}</p>}
              </div>
              <div className="text-sm text-muted-foreground">
                <p> Explanation: </p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {!hideStartNew && (
        <CardFooter>
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
};

export default QuizResult;
