"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Process = dynamic(() => import("@/Components/Loaders/Process"));

import { useMutation, useQueryClient } from "react-query";

import { updateTaskRequest } from "@/queries/tasks";

import { useTask } from "@/helpers/context";
import { TaskInputs } from "@/helpers/declarations";

import { SaveIcon } from "../Icons/Icons";

import styles from "../Forms/FormStyles.module.scss";

export default function CreateTask() {
  const router = useRouter();
  const { taskData } = useTask();
  const queryClient = useQueryClient();

  const [taskInputs, setTaskInputs] = useState<TaskInputs>({
    id: taskData?.id,
    task: taskData?.task,
    completed: taskData?.completed,
  });

  const edit = useMutation((data: TaskInputs) => updateTaskRequest(data), {
    onSuccess: async () => {
      setTaskInputs({ id: "", task: "", completed: false });
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

  const onEditTask = () => {
    edit.mutate(taskInputs);
  };

  return (
    <div className={styles.container}>
      <h2>Edit a task</h2>
      <div className={styles["form-wrapper"]}>
        <div className={styles["input-wrapper"]}>
          <label>ID:</label>
          <input type="text" value={taskInputs?.id} disabled />
        </div>
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
        <button onClick={onEditTask}>
          {edit?.isLoading ? (
            <Process />
          ) : (
            <span>
              {" "}
              Save changes <SaveIcon />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
