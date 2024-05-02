"use client";
import { createContext, useContext, useState } from "react";

type DataContextValue = {
  taskData: {
    task: string;
    completed: boolean;
    id: string;
  };
  setTaskData: (taskData: {
    task: string;
    completed: boolean;
    id: string;
  }) => void;
};

const TaskContext = createContext<DataContextValue | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [taskData, setTaskData] = useState({
    task: "",
    completed: false,
    id: "",
  });

  return (
    <TaskContext.Provider value={{ taskData, setTaskData }}>
      {children}
    </TaskContext.Provider>
  );
};
