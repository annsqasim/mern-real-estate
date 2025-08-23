import { Outlet, Link } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
        <List>
            <ListItemButton component={Link} to="/dashboard/properties">
            <ListItemText primary="Properties" />
        </ListItemButton>
            <ListItemButton component={Link} to="/dashboard/clients">
            <ListItemText primary="Clients" />
        </ListItemButton>
            <ListItemButton component={Link} to="/dashboard/viewings">
            <ListItemText primary="Viewings" />
        </ListItemButton>
        </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" gutterBottom>Agent Dashboard</Typography>
        <Outlet />
      </Box>
    </Box>
  );
}
