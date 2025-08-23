import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch properties
export const fetchProperties = createAsyncThunk(
  "properties/fetchAll",
  async () => {
    const res = await axios.get("/api/properties");
    return res.data;
  }
);

// Create property
export const createProperty = createAsyncThunk(
  "properties/create",
  async (newProperty) => {
    const res = await axios.post("/api/properties", newProperty);
    return res.data;
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createProperty.fulfilled, (state, action) => {
        state.items.push(action.payload); // update UI instantly
      });
  },
});

export default propertySlice.reducer;
