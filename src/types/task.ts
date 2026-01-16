export const TASK_STATUSES = [0, 1, 2] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  0: "To do",
  1: "In progress",
  2: "Done",
};

export type Task = {
  id: string; // ВАЖНО: строка (uuid)
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string; // ISO
};

export type CreateTaskDto = {
  title: string;
  description: string;
};

export type UpdateTaskDto = {
  title: string;
  description: string;
  status: TaskStatus;
};
