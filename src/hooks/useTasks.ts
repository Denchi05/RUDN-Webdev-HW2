import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasks";
import type { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "../types/task";

export const tasksKeys = {
  all: ["tasks"] as const,
  byId: (id: string) => ["tasks", id] as const,
};

export function useTasksQuery() {
  return useQuery({
    queryKey: tasksKeys.all,
    queryFn: tasksApi.getTasks,
  });
}

export function useTaskById(id?: string) {
  return useQuery({
    queryKey: tasksKeys.byId(id ?? ""),
    queryFn: () => tasksApi.getTaskById(id ?? ""),
    enabled: Boolean(id),
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTaskDto) => tasksApi.createTask(dto),
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: tasksKeys.all });
      qc.setQueryData(tasksKeys.byId(created.id), created);
    },
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) => tasksApi.updateTask(id, dto),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: tasksKeys.all });
      qc.setQueryData(tasksKeys.byId(updated.id), updated);
    },
  });
}

export function useMoveTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) => tasksApi.moveTask(id, status),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: tasksKeys.all });
      qc.setQueryData(tasksKeys.byId(updated.id), updated);
    },
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tasksApi.deleteTask(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: tasksKeys.all });
      qc.removeQueries({ queryKey: tasksKeys.byId(id) });
    },
  });
}
