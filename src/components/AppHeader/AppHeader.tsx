import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function AppHeader() {
  const loc = useLocation();

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          RUDN Kanban
        </Typography>

        <Box sx={{ flex: 1 }} />

        <Button
          component={RouterLink}
          to="/"
          color="inherit"
          variant={loc.pathname === "/" ? "outlined" : "text"}
        >
          Board
        </Button>

        <Button
          component={RouterLink}
          to="/tasks/new"
          color="inherit"
          variant={loc.pathname === "/tasks/new" ? "outlined" : "text"}
        >
          New task
        </Button>
      </Toolbar>
    </AppBar>
  );
}
