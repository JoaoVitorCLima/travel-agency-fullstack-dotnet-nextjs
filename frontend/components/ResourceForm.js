import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {api} from "../lib/api";

const defaults = {Categorias: {nome:"",imagemUrl:""}, Produto: {nome:"",descricao:"",preco:0,imagemUrl:"",estoque:0,categoriaId:1}};
const numberFields = new Set(["preco","estoque","categoriaId"]);
export default function ResourceForm({resource, basePath, idKey, action}) {
  const router = useRouter(); const {codigo} = router.query;
  const [data,setData]=useState(defaults[resource]);
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  useEffect(()=>{
    if(action !== "create" && codigo) api.get(`/${resource}/${codigo}`).then(r=>setData(r.data)).catch(()=>setError("Record not found or API unavailable."));
  },[action,codigo,resource]);
  async function submit(e) {
    e.preventDefault();setBusy(true);setError("");
    try {
      if(action==="delete") await api.delete(`/${resource}/${codigo}`);
      else if(action==="create") await api.post(`/${resource}`,data);
      else await api.put(`/${resource}/${codigo}`,{...data,[idKey]:Number(codigo)});
      router.push(basePath);
    } catch(err){setError(err?.response?.data?.title || "Request failed. Check input, API and database.");setBusy(false);}
  }
  const fields=Object.keys(defaults[resource]);
  return <main className="container py-4"><h1>{action==="create"?"Add":action==="update"?"Edit":"Delete"} {resource}</h1>
    {error && <p role="alert" className="alert alert-danger">{error}</p>}
    <form onSubmit={submit}>
      {action==="delete" ? <p>Delete record #{codigo} ({data.nome})? This cannot be undone.</p> : fields.map(field=><div key={field} className="mb-3">
        <label className="form-label" htmlFor={field}>{field}</label>
        <input className="form-control" id={field} name={field} required value={data[field]??""}
          type={numberFields.has(field)?"number":"text"} min={numberFields.has(field)?0:undefined}
          step={field==="preco"||field==="estoque"?"any":undefined}
          maxLength={field==="nome"?80:field==="descricao"||field==="imagemUrl"?300:undefined}
          onChange={e=>setData(old=>({...old,[field]:numberFields.has(field)?Number(e.target.value):e.target.value}))} />
      </div>)}
      <button type="submit" disabled={busy||((action!=="create")&&!codigo)} className={`btn ${action==="delete"?"btn-danger":"btn-primary"}`}>
        {busy?"Saving…":action==="delete"?"Confirm deletion":"Save"}</button>
    </form></main>;
}
