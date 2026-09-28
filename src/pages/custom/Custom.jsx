import { useState } from "react";
import "./Custom.css";

function Mock() {
    const [method, setMethod] = useState("GET");
    const [status, setStatus] = useState(200);
    const [body, setBody] = useState(`{
    "name": "Айчолпон",
    "age": 21,
    "student": true
}`);

    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const createEndpoint = (event) => {
        event.preventDefault();
        setError("");
        try {
            setResult({
                method,
                status: Number(status),
                headers: { "content-type": "application/json" },
                body: JSON.parse(body),
                previewUrl: "/mock/preview",
            });
        } catch {
            setError("The response body is not valid JSON. Check commas, quotes, and brackets.");
        }
    };

    return (
        <section className="mock page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Studio / Developer tools</p><h1 className="page-title">Response builder</h1><p className="page-description">Shape a JSON response and preview the request locally.</p></div>
                <span className="page-count">Local sandbox</span>
            </header>
            <form className="mock-form" onSubmit={createEndpoint}>
                <div className="form-grid">
                    <label className="form-label">Method<select className="filter-select" value={method} onChange={(event) => setMethod(event.target.value)}><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option></select></label>
                    <label className="form-label">Status code<select className="filter-select" value={status} onChange={(event) => setStatus(event.target.value)}><option value="200">200 · OK</option><option value="201">201 · Created</option><option value="400">400 · Bad request</option><option value="401">401 · Unauthorized</option><option value="404">404 · Not found</option><option value="500">500 · Server error</option></select></label>
                </div>
                <label className="form-label" style={{ marginTop: 15 }}>Response body<textarea className="form-area" value={body} onChange={(event) => setBody(event.target.value)} rows="9" spellCheck="false" /></label>
                {error && <p className="notice" role="alert">{error}</p>}
                <div className="card-footer"><span className="meta-text">JSON · application/json</span><button className="action-button" type="submit">Preview response</button></div>
            </form>
            {result && <section aria-live="polite" style={{ marginTop: 18 }}><div className="card-topline"><h2 style={{ fontSize: 16 }}>Response preview</h2><span className="pill pill-wine">{result.status} · {result.method}</span></div><pre className="custom-result">{JSON.stringify(result, null, 2)}</pre></section>}
        </section>
    );
}

export default Mock;