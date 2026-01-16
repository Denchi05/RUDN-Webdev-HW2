export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string; // ISO string
  updatedAt?: string; // ISO string
};

export type CreateTaskDto = {
  title: string;
  description?: string;
  status: TaskStatus;
};

export type UpdateTaskDto = Partial<Pick<Task, "title" | "description" | "status">>;
