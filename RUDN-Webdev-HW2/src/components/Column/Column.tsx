import { Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ColumnProps {
  title: string;
  children: ReactNode;
}

/**
 * A column container for the board. It displays a heading and wraps its
 * children (the task cards). Material UI's Paper component gives a slight
 * elevation and distinct background.
 */
export function Column({ title, children }: ColumnProps) {
  return (
    <Paper sx={{ p: 1, width: '100%' }} elevation={1}>
      <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}