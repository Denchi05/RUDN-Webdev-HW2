import axios from 'axios';
import { Task } from '../types/task';


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