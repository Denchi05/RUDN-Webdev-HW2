import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTasks } from '../api/api';
import { Task } from '../types/task';

/**
 * Hook to load and cache the list of tasks.
 *
 * It wraps TanStack Query's `useQuery` with a fixed key and default fetcher.
 */
export function useTasks() {
  return useQuery<Task[]>({ queryKey: ['tasks'], queryFn: fetchTasks });
}

/**
 * Hook to access the QueryClient instance. Use this to update task lists
 * from anywhere in the app (e.g. after creating, updating or deleting tasks).
 */
export function useTasksClient() {
  return useQueryClient();
}