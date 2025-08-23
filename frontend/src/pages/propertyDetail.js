import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  TextField,
  Button,
  Paper
} from "@mui/material";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    axios.get(`/api/properties/${id}`).then((res) => setProperty(res.data));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/clients", { ...form, propertyId: id });
    setForm({ name: "", email: "", message: "" });
    alert("Inquiry submitted!");
  };

  if (!property) return <p>Loading...</p>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>{property.title}</Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {property.location} — ${property.price}
      </Typography>

      {/* Gallery */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {property.images?.map((img, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
              <CardMedia component="img" height="200" image={img} alt={property.title} />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="body1" sx={{ mb: 4 }}>{property.description}</Typography>

      {/* Inquiry Form */}
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>Contact Agent</Typography>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <TextField label="Message" name="message" multiline rows={4} value={form.message} onChange={handleChange} />
          <Button type="submit" variant="contained">Send Inquiry</Button>
        </form>
      </Paper>
    </Box>
  );
}
