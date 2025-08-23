import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PropertyDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`/api/properties/${id}`).then(r => setData(r.data));
  }, [id]);

  if (!data) return <p>Loading…</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{data.title}</h1>
      <p>{data.location} — ${data.price} — {data.type}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(data.images || []).map((src, i) => (
          <img key={i} src={src} alt="" width="180" height="120" style={{ objectFit: "cover" }} />
        ))}
      </div>
      {/* // to-do inquiry form */}
    </div>
  );
}
