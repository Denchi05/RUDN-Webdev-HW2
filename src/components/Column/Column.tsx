import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import type { Task, TaskStatus } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";
import { useMoveTask } from "../../hooks/useTasks";

type Props = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
};

export default function Column({ title, status, tasks }: Props) {
  const move = useMoveTask();
  const [over, setOver] = useState(false);

  return (
    <Paper
      variant="outlined"
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("text/plain");
        if (!id) return;
        move.mutate({ id, status });
      }}
      sx={{
        p: 2,
        borderRadius: 2,
        minHeight: 240,
        width: 320,
        background: over ? "rgba(25,118,210,0.06)" : "white",
        transition: "background 0.12s ease",
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography fontWeight={900}>{title}</Typography>
          <Typography variant="caption" color="text.secondary">
            {tasks.length}
          </Typography>
        </Stack>

        {tasks.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No tasks
          </Typography>
        ) : (
          <Stack spacing={1.2}>
            {tasks.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
