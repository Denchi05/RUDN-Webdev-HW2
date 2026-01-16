import { Card, CardContent, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
}

/**
 * Displays a single task within a column. The card shows the task ID as
 * a link to the detailed page and the title as plain text. The use of
 * Material UI's Card component provides a consistent look across the
 * application.
 */
export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ p: 1 }}>
        <Typography variant="caption" component="div">
          <Link component={RouterLink} to={`/task/${task.id}`} underline="hover">
            #{task.id}
          </Link>
        </Typography>
        <Typography variant="body1">{task.title}</Typography>
      </CardContent>
    </Card>
  );
}