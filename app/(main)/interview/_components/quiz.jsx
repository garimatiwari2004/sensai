"use client";

import { generateQuiz } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";


const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  },[quizData]);

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The quiz contains 10 questions specific to your industry trends and
            skills. Take your time and choose the best answer for each question
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={generateQuizFn}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium">{question.question}</p>
        <RadioGroup defaultValue="option-one">
          {question.options.map((option, index) => {
            return (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={option} id={`option-${index}`} />

                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            );
          })}

          
        </RadioGroup>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Quiz;
