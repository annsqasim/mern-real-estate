import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function CreateProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "rent",
    images: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, images: form.images.split(",").map((s) => s.trim()) };
    await axios.post("/api/properties", payload);
    alert("Property created!");
    setForm({ title: "", description: "", price: "", location: "", type: "rent", images: "" });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>Create New Property</Typography>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} required />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={3} />
          <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} required />
          <TextField label="Location" name="location" value={form.location} onChange={handleChange} required />
          <TextField label="Type (rent/sale)" name="type" value={form.type} onChange={handleChange} required />
          <TextField label="Image URLs (comma separated)" name="images" value={form.images} onChange={handleChange} />
          <Button type="submit" variant="contained">Create</Button>
        </form>
      </Paper>
    </Box>
  );
}
