"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Process = dynamic(() => import("@/Components/Loaders/Process"));

import { useMutation, useQueryClient } from "react-query";

import { createTaskRequest } from "@/queries/tasks";

import { SaveIcon } from "../Icons/Icons";
import { AddTaskTypes } from "@/helpers/declarations";

import styles from "../Forms/FormStyles.module.scss";

export default function CreateTask() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [taskInputs, setTaskInputs] = useState<AddTaskTypes>({
    task: "",
    completed: false,
  });

  const addTask = useMutation((data: AddTaskTypes) => createTaskRequest(data), {
    onSuccess: async () => {
      setTaskInputs({ task: "", completed: false });
      router.push("/");
      await queryClient.invalidateQueries("tasks");
    },
  });

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTaskInputs({ ...taskInputs, task: value });
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTaskInputs({ ...taskInputs, completed: value === "true" });
  };

  const onAddTask = () => {
    addTask.mutate(taskInputs);
  };

  return (
    <div className={styles.container}>
      <h2>Create a task</h2>
      <div className={styles["form-wrapper"]}>
        <div className={styles["input-wrapper"]}>
          <label>Task description:</label>
          <textarea
            value={taskInputs?.task}
            onChange={onInputChange}
            rows={4}
          />
        </div>
        <div className={styles["input-wrapper"]}>
          <label>Task status:</label>
          <select
            onChange={onSelectChange}
            value={taskInputs.completed ? "true" : "false"}
          >
            <option value="false">Not completed</option>
            <option value="true">Completed</option>
          </select>
        </div>
        <button onClick={onAddTask}>
          {addTask?.isLoading ? (
            <Process />
          ) : (
            <span>
              Save <SaveIcon />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
