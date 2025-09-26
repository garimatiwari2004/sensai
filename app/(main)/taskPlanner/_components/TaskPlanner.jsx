"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TaskPlanner() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskText.trim(),
        completed: false,
      },
    ]);
    setTaskText("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold gradient-title">Task Planner</h1>

      <div className="flex gap-2">
        <Input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-2 border rounded ${
              task.completed ? "bg-green-100 line-through" : ""
            }`}
          >
            <span onClick={() => toggleComplete(task.id)} className="cursor-pointer">
              {task.text}
            </span>
            <Button variant="destructive" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-gray-500 text-sm">No tasks added yet!</p>
      )}
    </div>
  );
}
