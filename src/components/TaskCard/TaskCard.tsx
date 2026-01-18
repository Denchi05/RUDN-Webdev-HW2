import { Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Task } from "../../types/task";
import { TASK_STATUS_LABEL } from "../../types/task";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const nav = useNavigate();

  return (
    <Paper
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={() => nav(`/tasks/${task.id}`)}
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        userSelect: "none",
        "&:hover": { boxShadow: 2 },
      }}
    >
      <Stack spacing={0.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" gap={1}>
          <Typography fontWeight={800}>{task.title || "(No title)"}</Typography>
          <Typography variant="caption" color="text.secondary">
            {TASK_STATUS_LABEL[task.status]}
          </Typography>
        </Stack>

        {task.description ? (
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
            {task.description.length > 140 ? task.description.slice(0, 140) + "…" : task.description}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No description
          </Typography>
        )}

        <Typography variant="caption" color="text.secondary">
          Created: {new Date(task.createdAt).toLocaleString()}
        </Typography>
      </Stack>
    </Paper>
  );
}
