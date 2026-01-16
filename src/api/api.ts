import axios from 'axios';
import { Task } from '../types/task';

/**
 * Fetch a list of todos from JSONPlaceholder and map them into our Task format.
 *
 * JSONPlaceholder `/todos` returns objects with fields:
 *  - `userId`,
 *  - `id`,
 *  - `title`,
 *  - `completed` (boolean).
 *
 * We map these into our Task type as follows:
 *  - `id` is preserved,
 *  - `title` is preserved,
 *  - `description` is undefined (because the API does not provide one),
 *  - `createdAt` is set to the current date,
 *  - `status` is derived from `completed` and the task `id` to populate the three columns
 *    more evenly. Completed todos become status 2, others are alternately assigned
 *    to status 0 and status 1 based on their id.
 */
export async function fetchTasks(): Promise<Task[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  const data: { id: number; title: string; completed: boolean }[] = response.data;
  return data.map((item) => {
    const status: 0 | 1 | 2 = item.completed
      ? 2
      : (item.id % 2 === 0 ? 0 : 1);
    return {
      id: item.id,
      title: item.title,
      description: undefined,
      createdAt: new Date(),
      status,
    } as Task;
  });
}