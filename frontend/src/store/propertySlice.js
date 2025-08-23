import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProperties = createAsyncThunk(
  "properties/fetch",
  async ({ page = 1, limit = 6, type, location, minPrice, maxPrice }) => {
    const params = new URLSearchParams({ page, limit });
    if (type) params.append("type", type);
    if (location) params.append("location", location);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const res = await axios.get(`/api/properties?${params.toString()}`);
    return res.data;
  }
);

export const createProperty = createAsyncThunk(
  "properties/create",
  async (payload) => {
    const res = await axios.post("/api/properties", payload);
    return res.data;
  }
);

const slice = createSlice({
  name: "properties",
  initialState: { items: [], page: 1, totalPages: 1, total: 0, loading: false, error: null, lastQuery: {} },
  reducers: {
    setQuery(state, action) { state.lastQuery = action.payload || {}; }
  },
  extraReducers: (b) => {
    b.addCase(fetchProperties.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchProperties.fulfilled, (s, a) => {
       s.loading = false;
       s.items = a.payload.data;
       s.page = a.payload.page;
       s.totalPages = a.payload.totalPages;
       s.total = a.payload.total;
     })
     .addCase(fetchProperties.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
     .addCase(createProperty.fulfilled, (s, a) => { s.items.unshift(a.payload); });
  }
});

export const { setQuery } = slice.actions;
export default slice.reducer;
