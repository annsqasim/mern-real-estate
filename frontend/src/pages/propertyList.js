import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../store/propertySlice";

export default function PropertyList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Property Listings</h1>
      {items.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
          <h3>{p.title}</h3>
          <p>{p.location} — ${p.price}</p>
          <p>{p.type}</p>
        </div>
      ))}
    </div>
  );
}
