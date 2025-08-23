import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PropertyDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`/api/properties/${id}`).then(r => setData(r.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/clients", { ...form, property: id });
    setSubmitted(true);
  };

  if (!data) return <p>Loading…</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{data.title}</h1>
      <p>{data.location} — ${data.price} — {data.type}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {(data.images || []).map((src, i) => (
          <img key={i} src={src} alt="" width="180" height="120" style={{ objectFit: "cover" }} />
        ))}
      </div>

      <h2>Send Inquiry</h2>
      {submitted ? (
        <p style={{ color: "green" }}>Thank you! We’ll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 400 }}>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
          />
          <button type="submit">Submit Inquiry</button>
        </form>
      )}
    </div>
  );
}
