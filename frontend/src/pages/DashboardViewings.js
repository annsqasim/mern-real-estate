import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Chip
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

export default function DashboardViewings() {
  const [viewings, setViewings] = useState([]);

  useEffect(() => {
    axios.get("/api/viewings").then((res) => setViewings(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/api/viewings/${id}`, { status });
    const res = await axios.get("/api/viewings");
    setViewings(res.data);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Scheduled Viewings</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {viewings.map((v) => (
              <TableRow key={v._id}>
                <TableCell>{v.client?.name}</TableCell>
                <TableCell>{v.property?.title}</TableCell>
                <TableCell>{new Date(v.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={v.status}
                    color={v.status === "confirmed" ? "success" : "warning"}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="success" onClick={() => updateStatus(v._id, "confirmed")}><CheckCircle /></IconButton>
                  <IconButton color="error" onClick={() => updateStatus(v._id, "cancelled")}><Cancel /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
