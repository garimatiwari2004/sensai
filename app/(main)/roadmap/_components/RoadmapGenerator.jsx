"use client";


import React, { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "react-flow-renderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RoadmapGenerator = () => {
  const [role, setRole] = useState("");
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState({ nodes: [], edges: [] });
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!role || !goal) {
      alert("Please fill in both Role and Goal to generate roadmap.");
      return;
    }

    setGenerating(true);

    // Example roadmap logic for Software Engineer
    const nodes = [
      { id: "1", data: { label: "Learn Programming Basics" }, position: { x: 0, y: 0 } },
      { id: "2", data: { label: "Data Structures & Algorithms" }, position: { x: 250, y: 0 } },
      { id: "3", data: { label: "Frontend (React, HTML, CSS, JS)" }, position: { x: 500, y: -80 } },
      { id: "4", data: { label: "Backend (Node, Python, Databases)" }, position: { x: 500, y: 80 } },
      { id: "5", data: { label: "Projects & Portfolio" }, position: { x: 750, y: 0 } },
      { id: "6", data: { label: `Apply for ${role} roles` }, position: { x: 1000, y: 0 } },
    ];

    const edges = [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e2-3", source: "2", target: "3", animated: true },
      { id: "e3-4", source: "3", target: "4", animated: true },
      { id: "e3-5", source: "3", target: "5", animated: true },
      { id: "e4-5", source: "4", target: "5", animated: true },
      { id: "e5-6", source: "5", target: "6", animated: true },
    ];

    setRoadmap({ nodes, edges });
    setGenerating(false);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold gradient-title"> Roadmap Generator</h1>
      <p className="text-sm text-muted-foreground">
        Enter your target role and career goal, and LakshAI will generate a roadmap for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Target Role (e.g., Software Engineer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Input
          placeholder="Your Goal (e.g., Get a SWE internship at Google)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <Button onClick={handleGenerate} disabled={generating}>
        {generating ? "Generating..." : "Generate Roadmap"}
      </Button>

      {roadmap.nodes.length > 0 && (
        <div style={{ height: 500, border: "1px solid #ccc", borderRadius: "8px" }}>
          <ReactFlow
            nodes={roadmap.nodes}
            edges={roadmap.edges}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            zoomOnScroll={false}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      )}
    </div>
  );
};

export default RoadmapGenerator;