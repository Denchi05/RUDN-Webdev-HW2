import {
  Alert,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteTask, useTaskById, useUpdateTask } from "../../hooks/useTasks";
import { TASK_STATUS_LABEL, TASK_STATUSES, type TaskStatus } from "../../types/task";

export default function TaskPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const q = useTaskById(id);
  const update = useUpdateTask();
  const del = useDeleteTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(0);

  useEffect(() => {
    if (!q.data) return;
    setTitle(q.data.title ?? "");
    setDescription(q.data.description ?? "");
    setStatus(q.data.status ?? 0);
  }, [q.data]);

  if (q.isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (q.isError) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Failed to load task</Alert>
      </Container>
    );
  }

  if (!q.data) {
    return (
      <Container sx={{ py: 4 }}>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, maxWidth: 720, mx: "auto" }}>
          <Stack spacing={2}>
            <Alert severity="warning">Task not found (maybe deleted)</Alert>
            <Button variant="contained" onClick={() => nav("/")}>
              Back to board
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  const canSave = title.trim().length > 0 && !update.isPending && !del.isPending;

  return (
    <Container sx={{ py: 4 }}>
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, maxWidth: 720, mx: "auto" }}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={900}>
            Task
          </Typography>

          <TextField label="ID" value={q.data.id} InputProps={{ readOnly: true }} />
          <TextField
            label="Created"
            value={new Date(q.data.createdAt).toLocaleString()}
            InputProps={{ readOnly: true }}
          />

          <TextField label="Title *" value={title} onChange={(e) => setTitle(e.target.value)} />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={4}
          />

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value) as TaskStatus)}
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
              disabled={!canSave}
              onClick={() => {
                update.mutate(
                  { id: q.data.id, dto: { title, description, status } },
                  { onSuccess: () => nav("/") }
                );
              }}
            >
              Save
            </Button>

            <Button
              color="error"
              variant="outlined"
              disabled={del.isPending}
              onClick={() => {
                del.mutate(q.data.id, { onSuccess: () => nav("/") });
              }}
            >
              Delete
            </Button>

            <Button variant="text" onClick={() => nav("/")}>
              Back
            </Button>
          </Stack>

          {update.isError ? <Alert severity="error">Update failed</Alert> : null}
          {del.isError ? <Alert severity="error">Delete failed</Alert> : null}
        </Stack>
      </Paper>
    </Container>
  );
}
