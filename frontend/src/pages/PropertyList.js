import { useEffect, useState } from "react";
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
  Pagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

export default function PropertyList() {
  const dispatch = useDispatch();
  const { items, status, page, totalPages } = useSelector((s) => s.properties);

  const [filters, setFilters] = useState({
    type: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    dispatch(fetchProperties({ page: 1, ...filters }));
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    dispatch(fetchProperties({ page: value, ...filters }));
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    dispatch(fetchProperties({ page: 1, ...filters }));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error fetching properties.</p>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Find Your Next Home
      </Typography>

      <Grid container spacing={3} alignItems="flex-start">
        {/* Sidebar Filters */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 3,
              position: { md: "sticky" },
              top: 90,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={filters.type}
                label="Type"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="sale">Sale</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Min Price"
              name="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={handleFilterChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Max Price"
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button variant="contained" fullWidth onClick={applyFilters}>
              Apply Filters
            </Button>
          </Paper>
        </Grid>

        {/* Property Grid */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {items.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p._id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  {p.images?.[0] && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={p.images[0]}
                      alt={p.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" noWrap>
                      {p.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                    >
                      {p.location}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="bold"
                    >
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
        </Grid>
      </Grid>
    </Box>
  );
}
