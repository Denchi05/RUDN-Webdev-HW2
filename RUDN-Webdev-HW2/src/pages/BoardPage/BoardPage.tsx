import { Grid, CircularProgress, Alert, Box } from '@mui/material';
import { useTasks } from '../../hooks/useTasks';
import { Column } from '../../components/Column/Column';
import { TaskCard } from '../../components/TaskCard/TaskCard';

/**
 * Renders the main Kanban board page. It uses the `useTasks` hook to
 * retrieve the list of tasks and then splits them into three columns
 * based on their status. The columns are displayed using a responsive
 * Grid container. When data is loading or an error occurs, appropriate
 * feedback components are shown.
 */
export function BoardPage() {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Не удалось загрузить задачи</Alert>;
  }

  // Group tasks by status
  const byStatus = [0, 1, 2].map((status) =>
    tasks?.filter((t) => t.status === status) ?? []
  );

  const titles = ['К выполнению', 'В работе', 'Выполнено'];

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {byStatus.map((tasksInStatus, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <Column title={titles[idx]}>
            {tasksInStatus.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Column>
        </Grid>
      ))}
    </Grid>
  );
}