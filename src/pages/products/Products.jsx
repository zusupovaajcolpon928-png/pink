
import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

function Products() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All categories");
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        axios.get("https://fooapi.com/api/products")
            .then(({ data }) => setAllProducts(Array.isArray(data?.data) ? data.data : []))
            .catch((error) => console.error("FooAPI products request failed:", error));
    }, []);

    const categories = ["All categories", ...new Set(allProducts.map((product) => product.category))];
    const products = allProducts.filter((product) =>
        (category === "All categories" || product.category === category) &&
        `${product.title} ${product.brand} ${product.category}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="products page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Workspace / Inventory</p><h1 className="page-title">Products</h1><p className="page-description">A considered collection of everyday studio goods.</p></div>
                <span className="page-count">{allProducts.length} items</span>
            </header>
            <div className="page-toolbar">
                <input className="search-field" aria-label="Search products" placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} />
                <select className="filter-select" aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
            </div>
            <div className="products-list data-grid">
                {products.map((product) => (
                    <article className="product-card data-card" key={product.id}>
                        <div className="card-topline"><span className="eyebrow">{product.category}</span><span className="pill">{product.stock} in stock</span></div>
                        <div aria-hidden="true" style={{ height: 76, margin: "0 0 16px", borderRadius: 4, background: `linear-gradient(135deg, hsl(${Number(product.id) * 47 % 360} 28% 68%), #e8eff2)` }} />
                        <h2>{product.title}</h2>
                        <p>{product.brand}</p>
                        <div className="card-footer"><span className="meta-text">SKU {product.id} · ★ {product.rating}</span><strong style={{ color: "var(--wine)", fontSize: 15 }}>${product.price}</strong></div>
                    </article>
                ))}
                {products.length === 0 && <p className="empty-state">No products match these filters.</p>}
            </div>
        </section>
    );
}

export default Products;

