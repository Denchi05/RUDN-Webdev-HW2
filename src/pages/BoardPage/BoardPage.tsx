import { Alert, CircularProgress, Container, Stack, Typography } from "@mui/material";
import Column from "../../components/Column/Column";
import { useTasksQuery } from "../../hooks/useTasks";
import type { TaskStatus } from "../../types/task";

export default function BoardPage() {
  const q = useTasksQuery();

  if (q.isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (q.isError) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Failed to load tasks</Alert>
      </Container>
    );
  }

  const tasks = q.data ?? [];

  const byStatus = (s: TaskStatus) => tasks.filter((t) => t.status === s);

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={2.5}>
        <Typography variant="h4" fontWeight={900}>
          Kanban board
        </Typography>

        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ overflowX: "auto", pb: 1 }}>
          <Column title="To do" status={0} tasks={byStatus(0)} />
          <Column title="In progress" status={1} tasks={byStatus(1)} />
          <Column title="Done" status={2} tasks={byStatus(2)} />
        </Stack>
      </Stack>
    </Container>
  );
}
