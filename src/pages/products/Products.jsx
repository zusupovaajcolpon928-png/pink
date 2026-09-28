
import { useState } from "react";
import { demoProducts } from "../../data/demoData.js";
import "./Products.css";

function Products() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All categories");
    const categories = ["All categories", ...new Set(demoProducts.map((product) => product.category))];
    const products = demoProducts.filter((product) =>
        (category === "All categories" || product.category === category) &&
        `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="products page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Workspace / Inventory</p><h1 className="page-title">Products</h1><p className="page-description">A considered collection of everyday studio goods.</p></div>
                <span className="page-count">{demoProducts.length} items</span>
            </header>
            <div className="page-toolbar">
                <input className="search-field" aria-label="Search products" placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} />
                <select className="filter-select" aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
            </div>
            <div className="products-list data-grid">
                {products.map((product) => (
                    <article className="product-card data-card" key={product.id}>
                        <div className="card-topline"><span className="eyebrow">{product.category}</span><span className="pill">{product.stock} in stock</span></div>
                        <div aria-hidden="true" style={{ height: 76, margin: "0 0 16px", borderRadius: 4, background: `linear-gradient(135deg, ${product.swatch}, #e8eff2)` }} />
                        <h2>{product.name}</h2>
                        <div className="card-footer"><span className="meta-text">SKU {product.id}</span><strong style={{ color: "var(--wine)", fontSize: 15 }}>${product.price}.00</strong></div>
                    </article>
                ))}
                {products.length === 0 && <p className="empty-state">No products match these filters.</p>}
            </div>
        </section>
    );
}

export default Products;

