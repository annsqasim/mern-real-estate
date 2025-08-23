import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box
} from "@mui/material";

export default function DashboardClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get("/api/clients").then((res) => setClients(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Client Inquiries</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Property</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{c.message}</TableCell>
                <TableCell>{c.property?.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
