import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProperty } from "../store/propertySlice";
import { useNavigate } from "react-router-dom";

export default function CreateProperty() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    type: "rent",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: "",
    images: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      amenities: form.amenities ? form.amenities.split(",").map(a => a.trim()) : [],
      images: form.images ? form.images.split(",").map(i => i.trim()) : []
    };

    await dispatch(createProperty(payload));
    navigate("/"); // back to list
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Property</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 500 }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
        />
        <input
          name="bathrooms"
          type="number"
          placeholder="Bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
        />
        <input
          name="area"
          type="number"
          placeholder="Area (sqft)"
          value={form.area}
          onChange={handleChange}
        />
        <input
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={form.amenities}
          onChange={handleChange}
        />
        <input
          name="images"
          placeholder="Image URLs (comma separated)"
          value={form.images}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
