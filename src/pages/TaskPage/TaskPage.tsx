import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { TASK_STATUSES, TASK_STATUS_LABEL, type TaskStatus } from "../../types/task";
import { useDeleteTask, useTaskById, useUpdateTask } from "../../hooks/useTasks";

export default function TaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Важно: useParams() всегда возвращает строку (или undefined),
  // поэтому НЕ надо делать Number(id) / parseInt(id).
  if (!id) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Invalid task id</Alert>
      </Container>
    );
  }

  const { data: task, isLoading, isError } = useTaskById(id);
  const del = useDeleteTask();
  const upd = useUpdateTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");

  // заполняем форму, когда загрузили задачу
  useEffect(() => {
    if (!task) return;
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  if (isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading…</Typography>
      </Container>
    );
  }

  if (isError || !task) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Task not found</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight={700}>
          Task
        </Typography>

        <Box component="form" onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={3}
            />

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              {TASK_STATUSES.map((s) => (
                <MenuItem key={s} value={s}>
                  {TASK_STATUS_LABEL[s]}
                </MenuItem>
              ))}
            </TextField>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={async () => {
                  await upd.mutateAsync({
                    id: task.id,
                    dto: { title, description, status },
                  });
                  navigate("/");
                }}
                disabled={upd.isPending}
              >
                Save
              </Button>

              <Button
                color="error"
                variant="outlined"
                onClick={async () => {
                  await del.mutateAsync(task.id);
                  navigate("/");
                }}
                disabled={del.isPending}
              >
                Delete
              </Button>

              <Button variant="text" onClick={() => navigate("/")}>Back</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
