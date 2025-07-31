"use client";

import { format, set } from "date-fns";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { LineChart } from "recharts";
import { space } from "postcss/lib/list";

const PerformanceChart = ({ assessments }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "yyyy-MM-dd"),
        score: assessment.quizScore,
      }));

      setChartData(formattedData);
    }
  }, [assessments]);
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-3xl md:4xl gradient-title">
          Performance Trend
        </CardTitle>
        <CardDescription>Your Quiz Scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart

              data={chartData}
              
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0,100]}/>
              <Tooltip content={({ active, payload }) => {
                if (active && payload?.length) {
                  return(
                    <div className="bg-background border rounded-lg p-2 shadow-md ">
                      <p className="text-sm font-medium">
                        Score:{ payload[0].value }%
                      </p>
                      <p className="text-xs text-gray-500">
                        {payload[0].payload.date}
                      </p>
                    </div>
                  );

              }}}/>
              
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default PerformanceChart;
