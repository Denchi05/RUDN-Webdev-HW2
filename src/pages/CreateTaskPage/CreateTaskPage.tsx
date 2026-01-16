import { Alert, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTask } from "../../hooks/useTasks";

export default function CreateTaskPage() {
  const nav = useNavigate();
  const create = useCreateTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = title.trim().length > 0 && !create.isPending;

  return (
    <Container sx={{ py: 4 }}>
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, maxWidth: 720, mx: "auto" }}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={900}>
            New task
          </Typography>

          <TextField
            label="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={4}
          />

          {create.isError ? <Alert severity="error">Create failed</Alert> : null}

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              disabled={!canSubmit}
              onClick={() => {
                create.mutate(
                  { title, description },
                  {
                    onSuccess: () => nav("/"),
                  }
                );
              }}
            >
              Create
            </Button>

            <Button variant="text" onClick={() => nav("/")}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
