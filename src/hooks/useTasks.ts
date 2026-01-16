import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasks";
import type { CreateTaskDto, UpdateTaskDto } from "../types/task";

export const taskKeys = {
  all: ["tasks"] as const,
  byId: (id: string) => ["tasks", id] as const,
};

export function useTasksQuery() {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: () => tasksApi.getTasks(),
  });
}

export function useTaskById(id?: string) {
  return useQuery({
    queryKey: taskKeys.byId(id ?? ""),
    queryFn: () => tasksApi.getTaskById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTaskDto) => tasksApi.createTask(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      tasksApi.updateTask(id, dto),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: taskKeys.all });
      qc.invalidateQueries({ queryKey: taskKeys.byId(updated.id) });
    },
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tasksApi.deleteTask(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: taskKeys.all });
      qc.removeQueries({ queryKey: taskKeys.byId(id) });
    },
  });
}
