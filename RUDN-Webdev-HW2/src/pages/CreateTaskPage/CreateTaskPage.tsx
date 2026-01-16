import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Stack } from '@mui/material';
import { useTasks, useTasksClient } from '../../hooks/useTasks';
import { Task } from '../../types/task';

/**
 * Page for creating a new task. It presents a form with title and
 * description fields. When submitted, it calculates a new unique ID,
 * sets default metadata and inserts the task into the cached list via
 * the QueryClient. Afterwards it redirects either to the board or to
 * the new task detail page.
 */
export function CreateTaskPage() {
  const { data: tasks } = useTasks();
  const queryClient = useTasksClient();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;
    // determine new id as max existing + 1
    const existingIds = tasks?.map((t) => t.id) ?? [];
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    const newTask: Task = {
      id: newId,
      title: title.trim(),
      description: description.trim() || undefined,
      createdAt: new Date(),
      status: 0,
    };
    // update cache
    queryClient.setQueryData(['tasks'], (old: Task[] | undefined) => {
      return old ? [...old, newTask] : [newTask];
    });
    // navigate to the new task page
    navigate(`/task/${newId}`);
  };

  return (
    <Box sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
      <Stack spacing={2}>
        <TextField
          label="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <Button variant="contained" onClick={handleCreate} disabled={!title.trim()}>
          Создать
        </Button>
      </Stack>
    </Box>
  );
}