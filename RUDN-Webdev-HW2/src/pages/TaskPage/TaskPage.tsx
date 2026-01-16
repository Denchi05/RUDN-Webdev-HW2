import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Stack,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import { useTasks, useTasksClient } from '../../hooks/useTasks';
import { TaskStatus, Task } from '../../types/task';

/**
 * Page for viewing and editing a single task. The task ID is obtained
 * from the route parameters. Users can change the task status or delete
 * the task entirely. Updates are performed by mutating the cached array
 * of tasks via the QueryClient.
 */
export function TaskPage() {
  const { id } = useParams();
  const taskId = Number(id);
  const { data: tasks } = useTasks();
  const queryClient = useTasksClient();
  const navigate = useNavigate();

  const task = tasks?.find((t) => t.id === taskId);

  const updateStatus = (newStatus: TaskStatus) => {
    queryClient.setQueryData(['tasks'], (old: Task[] | undefined) => {
      if (!old) return old;
      return old.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
    });
  };

  const removeTask = () => {
    queryClient.setQueryData(['tasks'], (old: Task[] | undefined) => {
      if (!old) return old;
      return old.filter((t) => t.id !== taskId);
    });
    navigate('/board');
  };

  if (!task) {
    return <Alert severity="warning">Задача не найдена</Alert>;
  }

  // Helper to display status label
  const statusLabel = (status: TaskStatus) => {
    switch (status) {
      case 0:
        return 'К выполнению';
      case 1:
        return 'В работе';
      case 2:
        return 'Выполнено';
    }
  };

  return (
    <Box sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">
          #{task.id}. {task.title}
        </Typography>
        <Chip label={statusLabel(task.status)} color={task.status === 2 ? 'success' : task.status === 1 ? 'warning' : 'default'} />
        {task.description && (
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {task.description}
          </Typography>
        )}
        <Typography variant="caption">
          Создано: {task.createdAt.toLocaleString()}
        </Typography>
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Изменить статус
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={() => updateStatus(0)}
              disabled={task.status === 0}
            >
              К выполнению
            </Button>
            <Button
              variant="outlined"
              onClick={() => updateStatus(1)}
              disabled={task.status === 1}
            >
              В работе
            </Button>
            <Button
              variant="outlined"
              onClick={() => updateStatus(2)}
              disabled={task.status === 2}
            >
              Выполнено
            </Button>
          </Stack>
        </Box>
        <Button variant="contained" color="error" onClick={removeTask}>
          Удалить задачу
        </Button>
      </Stack>
    </Box>
  );
}