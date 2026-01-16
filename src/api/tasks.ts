import type { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "../types/task";

const LS_KEY = "rudn-kanban.tasks.v1";

function sleep(ms = 150) {
  return new Promise((r) => setTimeout(r, ms));
}

function safeParse(value: string | null): Task[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch {
    return [];
  }
}

function readTasks(): Task[] {
  return safeParse(localStorage.getItem(LS_KEY));
}

function writeTasks(tasks: Task[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(tasks));
}

function makeId(): string {
  // норм в современных браузерах
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  // fallback
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function ensureSeed() {
  const current = readTasks();
  if (current.length > 0) return;

  const seed: Task[] = [
    {
      id: makeId(),
      title: "Редактирование/удаление",
      description: "Страница задачи + действия",
      status: 2,
      createdAt: new Date().toISOString(),
    },
  ];
  writeTasks(seed);
}

export const tasksApi = {
  async getTasks(): Promise<Task[]> {
    ensureSeed();
    await sleep();
    return readTasks().sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },

  async getTaskById(id: string): Promise<Task | null> {
    ensureSeed();
    await sleep();
    const tasks = readTasks();
    return tasks.find((t) => t.id === id) ?? null;
  },

  async createTask(dto: CreateTaskDto): Promise<Task> {
    ensureSeed();
    await sleep();

    const tasks = readTasks();
    const created: Task = {
      id: makeId(),
      title: dto.title.trim(),
      description: dto.description.trim(),
      status: 0,
      createdAt: new Date().toISOString(),
    };

    writeTasks([...tasks, created]);
    return created;
  },

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    ensureSeed();
    await sleep();

    const tasks = readTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Task not found");

    const updated: Task = {
      ...tasks[idx],
      title: dto.title.trim(),
      description: dto.description.trim(),
      status: dto.status,
    };

    const next = tasks.slice();
    next[idx] = updated;
    writeTasks(next);

    return updated;
  },

  async moveTask(id: string, status: TaskStatus): Promise<Task> {
    ensureSeed();
    await sleep();

    const tasks = readTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Task not found");

    const updated: Task = { ...tasks[idx], status };
    const next = tasks.slice();
    next[idx] = updated;
    writeTasks(next);

    return updated;
  },

  async deleteTask(id: string): Promise<void> {
    ensureSeed();
    await sleep();

    const tasks = readTasks();
    writeTasks(tasks.filter((t) => t.id !== id));
  },
};
