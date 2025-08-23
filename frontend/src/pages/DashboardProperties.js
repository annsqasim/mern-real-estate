import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../store/propertySlice";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function DashboardProperties() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.properties);

  useEffect(() => {
    dispatch(fetchProperties({ page: 1 }));
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios.delete(`/api/properties/${id}`);
    dispatch(fetchProperties({ page: 1 }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Manage Properties</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.location}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.type}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary"><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(p._id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
