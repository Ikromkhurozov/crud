import baseApi from "@/app/api/base-api";
import { TaskInputs } from "@/helpers/declarations";

export const getTasksList = async () => {
  return await baseApi.request(`/tasks`, "get", null, null);
};

export const getTasksWithPage = async (searchTerm: string, page: number) => {
  return await baseApi.request(
    `/tasks?search=${searchTerm}&page=${page}&limit=10`,
    "get",
    null,
    null
  );
};

export const createTaskRequest = async (data: {
  task: string;
  completed: boolean;
}) => {
  return await baseApi.request(`/tasks`, "post", data, null);
};

export const updateTaskRequest = async (data: TaskInputs) => {
  return await baseApi.request(`/tasks/${data.id}`, "put", data, null);
};

export const deleteTaskRequest = async (taskId: string) => {
  return await baseApi.request(`/tasks/${taskId}`, "delete");
};

export const onMarkAsCompleted = async (data: {
  id: string;
  completed: boolean;
}) => {
  return await baseApi.request(`/tasks/${data.id}`, "put", data, null);
};
