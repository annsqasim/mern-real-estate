import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../store/propertySlice";

export default function PropertyDetail() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.properties);

  useEffect(() => { dispatch(fetchProperties()); }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Property Details</h1>
      {items.map((p) => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.price} USD</p>
        </div>
      ))}
    </div>
  );
}
