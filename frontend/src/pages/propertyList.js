import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties, setQuery } from "../store/propertySlice";

export default function PropertyList() {
  const dispatch = useDispatch();
  const { items, loading, error, page, totalPages, total, lastQuery } = useSelector(s => s.properties);

  // simple filter UI state
  const [filters, setFilters] = useState({
    q: "",
    type: "",
    location: "",
    priceMin: "",
    priceMax: "",
    bedMin: "",
    bathMin: "",
    limit: 8
  });

  // load on mount
  useEffect(() => {
    dispatch(fetchProperties({ page: 1, limit: filters.limit }));
  }, [dispatch]); // first load

  const applyFilters = () => {
    const query = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== "" && v != null));
    dispatch(setQuery(query));
    dispatch(fetchProperties({ ...query, page: 1 }));
  };

  const goToPage = (p) => {
    dispatch(fetchProperties({ ...lastQuery, page: p }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Properties</h1>

      {/* Filters */}
      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(6, minmax(0, 1fr))", marginBottom: 12 }}>
        <input placeholder="Search (q)" value={filters.q} onChange={e => setFilters(f => ({...f, q:e.target.value}))}/>
        <select value={filters.type} onChange={e => setFilters(f => ({...f, type:e.target.value}))}>
          <option value="">Any Type</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <input placeholder="Location" value={filters.location} onChange={e => setFilters(f => ({...f, location:e.target.value}))}/>
        <input placeholder="Min Price" type="number" value={filters.priceMin} onChange={e => setFilters(f => ({...f, priceMin:e.target.value}))}/>
        <input placeholder="Max Price" type="number" value={filters.priceMax} onChange={e => setFilters(f => ({...f, priceMax:e.target.value}))}/>
        <input placeholder="Min Beds" type="number" value={filters.bedMin} onChange={e => setFilters(f => ({...f, bedMin:e.target.value}))}/>
      </div>
      <button onClick={applyFilters}>Apply Filters</button>

      <div style={{ marginTop: 16 }}>
        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <>
            <p>{total} results</p>
            {items.map(p => (
              <div key={p._id} style={{ border: "1px solid #eee", padding: 12, marginBottom: 8 }}>
                <h3>{p.title}</h3>
                <p>{p.location} — ${p.price} — {p.type}</p>
                <a href={`/property/${p._id}`}>View details</a>
              </div>
            ))}

            {/* Pagination */}
            <div style={{ marginTop: 12 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => goToPage(n)}
                  disabled={n === page}
                  style={{ marginRight: 6 }}
                >{n}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
