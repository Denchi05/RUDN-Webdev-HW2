import type { CreateTaskDto, Task, UpdateTaskDto } from "../types/task";

const STORAGE_KEY = "rudn_hw2_tasks";

function nowIso() {
  return new Date().toISOString();
}

function uuid() {
  // modern browsers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cryptoAny: any = globalThis.crypto;
  if (cryptoAny?.randomUUID) return cryptoAny.randomUUID() as string;
  // fallback
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const seed: Task[] = [
  {
    id: uuid(),
    title: "Сделать каркас Kanban",
    description: "Колонки: To do / In progress / Done",
    status: "todo",
    createdAt: nowIso(),
  },
  {
    id: uuid(),
    title: "Редактирование/удаление",
    description: "Страница задачи + действия",
    status: "done",
    createdAt: nowIso(),
  },
];

function read(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Task[];
    // normalize IDs to string
    return Array.isArray(parsed)
      ? parsed.map((t) => ({ ...t, id: String(t.id) }))
      : seed;
  } catch {
    return seed;
  }
}

function write(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export const tasksApi = {
  async getTasks(): Promise<Task[]> {
    return read();
  },

  async getTaskById(id: string): Promise<Task | null> {
    const tasks = read();
    return tasks.find((t) => t.id === String(id)) ?? null;
  },

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const tasks = read();
    const task: Task = {
      id: uuid(),
      title: dto.title,
      description: dto.description ?? "",
      status: dto.status,
      createdAt: nowIso(),
    };
    write([task, ...tasks]);
    return task;
  },

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    const tasks = read();
    const idx = tasks.findIndex((t) => t.id === String(id));
    if (idx === -1) throw new Error("Task not found");

    const updated: Task = {
      ...tasks[idx],
      ...dto,
      id: String(id),
      updatedAt: nowIso(),
    };

    const next = [...tasks];
    next[idx] = updated;
    write(next);
    return updated;
  },

  async deleteTask(id: string): Promise<void> {
    const tasks = read();
    const next = tasks.filter((t) => t.id !== String(id));
    write(next);
  },
};
