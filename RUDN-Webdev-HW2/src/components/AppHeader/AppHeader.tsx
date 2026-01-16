import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Application header component. It displays a title and navigation buttons.
 *
 * We rely on Material UI's AppBar and Toolbar for layout. The RouterLink
 * component is passed to the Button via the `component` prop to enable
 * client‑side navigation without reloading the page. The `to` prop
 * corresponds to the target route.
 */
export function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Kanban Board
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/board"
          >
            Доска
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/create"
          >
            Создать
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}