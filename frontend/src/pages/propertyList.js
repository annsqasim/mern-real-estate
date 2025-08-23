import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../store/propertySlice";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Pagination
} from "@mui/material";

export default function PropertyList() {
  const dispatch = useDispatch();
  const { items, status, page, totalPages } = useSelector((s) => s.properties);

  useEffect(() => {
    dispatch(fetchProperties({ page: 1 }));
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    dispatch(fetchProperties({ page: value }));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error fetching properties.</p>;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Available Properties
      </Typography>

      <Grid container spacing={3}>
        {items.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <Card sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column" }}>
              {p.images?.[0] && (
                <CardMedia
                  component="img"
                  height="180"
                  image={p.images[0]}
                  alt={p.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.location}
                </Typography>
                <Typography variant="body2" color="primary">
                  ${p.price} • {p.type}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  component={Link}
                  to={`/property/${p._id}`}
                  variant="contained"
                  fullWidth
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}
