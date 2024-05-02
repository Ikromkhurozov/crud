"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Process = dynamic(() => import("@/Components/Loaders/Process"));

import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  getTasksList,
  getTasksWithPage,
  deleteTaskRequest,
  onMarkAsCompleted,
} from "@/queries/tasks";

import { useTask } from "@/helpers/context";

import { CheckIcon, DeleteIcon, EditIcon, TimeIcon } from "../Icons/Icons";

import styles from "./CustomTableStyles.module.scss";

type TableProps = {
  filteredValue: string;
};

export default function CustomTable({
  filteredValue,
}: TableProps): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const [completedLoading, setCompletedLoading] = useState("");
  const queryClient = useQueryClient();
  const { setTaskData } = useTask();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const tasksList: { data: any } = useQuery(["tasks.list"], () =>
    getTasksList()
  );

  const tasks: { data: any } = useQuery(
    ["tasks", filteredValue, currentPage],
    () => getTasksWithPage(filteredValue, currentPage)
  );

  const deleteTask = useMutation(
    (taskId: string) => deleteTaskRequest(taskId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("tasks");
      },
    }
  );

  const markAsDone = useMutation(
    (data: { id: string; completed: boolean }) => onMarkAsCompleted(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("tasks");
      },
    }
  );

  const onEditUser = (item: {
    id: string;
    completed: boolean;
    task: string;
  }) => {
    setTaskData({ task: item.task, completed: item.completed, id: item.id });
    router.push("/edit-tasks");
  };

  const onDeleteTask = (taskId: string) => {
    setLoading(taskId);
    deleteTask.mutate(taskId);
  };

  const onCompleted = (item: { id: string; completed: boolean }) => {
    const data = {
      id: item.id,
      completed: !item.completed,
    };
    setCompletedLoading(item.id);
    markAsDone.mutate(data);
  };

  return (
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Task Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.data &&
            tasks?.data?.map(
              (item: { id: string; task: string; completed: boolean }) => (
                <tr key={item.id} className={styles["table-row"]}>
                  <td>{item?.id}</td>
                  <td>{item?.task}</td>
                  <td>
                    {item?.completed ? (
                      <p>
                        Task completed <CheckIcon />
                      </p>
                    ) : (
                      <p>
                        Uncompleted task <TimeIcon />
                      </p>
                    )}
                  </td>
                  <td>
                    <button
                      className={styles["edit-button"]}
                      onClick={() => onEditUser(item)}
                    >
                      Edit
                      <EditIcon />
                    </button>
                    <button
                      className={styles["delete-button"]}
                      onClick={() => onDeleteTask(item.id)}
                    >
                      {loading === item.id ? (
                        <Process />
                      ) : (
                        <span>
                          Delete
                          <DeleteIcon />
                        </span>
                      )}
                    </button>
                    {!item?.completed && (
                      <button
                        className={styles["done-button"]}
                        onClick={() => onCompleted(item)}
                      >
                        {completedLoading === item.id ? (
                          <Process />
                        ) : (
                          <span>
                            {" "}
                            Mark as completed
                            <CheckIcon />
                          </span>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.isArray(tasksList?.data) &&
          tasksList?.data?.length > itemsPerPage && (
            <ul className={styles.pageNumbers}>
              {Array.from({
                length: Math.ceil(tasksList?.data?.length / itemsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? styles.active : ""}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(tasksList?.data?.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
