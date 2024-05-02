export type Task = {
  id: string | number;
  task: string;
  completed: boolean;
};

export type TaskInputs = {
  id: string | number;
  task: string;
  completed: boolean;
};

export type AddTaskTypes = {
  task: string;
  completed: boolean;
};

export type SearchInputProps = {
  value: string;
};
