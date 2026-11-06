import {useEffect, useState} from "react";
import Link from "next/link";
import {api} from "../lib/api";

export default function ResourceList({resource, title, basePath, idKey}) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/${resource}`).then(({data}) => setItems(data)).catch(() => setError("Unable to load records. Check API and database."))
      .finally(() => setLoading(false));
  }, [resource]);
  return <main className="container py-4">
    <h1>{title}</h1>
    <p><Link href={`${basePath}/add-${basePath.slice(1)}`} className="btn btn-primary">Add new</Link></p>
    {loading && <p>Loading…</p>}
    {error && <div role="alert" className="alert alert-danger">{error}</div>}
    {!loading && !error && <table className="table table-striped"><thead><tr><th>ID</th><th>Name</th><th>Actions</th></tr></thead>
      <tbody>{items.map(item => <tr key={item[idKey]}><td>{item[idKey]}</td><td>{item.nome}</td><td>
        <Link href={`${basePath}/update-${basePath.slice(1)}/${item[idKey]}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
        <Link href={`${basePath}/delete-${basePath.slice(1)}/${item[idKey]}`} className="btn btn-sm btn-outline-danger">Delete</Link>
      </td></tr>)}</tbody></table>}
  </main>;
}
