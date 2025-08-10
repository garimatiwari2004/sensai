"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import React, { useState } from "react";


const ResumeBuilder = () => {
    const [activeTab, setActiveTab] = useState("edit");




  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          {" "}
          Resume Builder
        </h1>

        <div className="space-x-2 mt-4">
          <Button variant="destructive">
            <Save className="h-4 w-4" />
            Save
          </Button>

          <Button>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="edit">Form</TabsTrigger>
            <TabsTrigger value="preview">Markdown</TabsTrigger>
          </TabsList>
          
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeBuilder;
