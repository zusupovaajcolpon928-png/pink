import { useState } from "react";
import { demoCities } from "../../data/demoData.js";
import "./Cities.css";

function Cities() {
    const [query, setQuery] = useState("");
    const cities = demoCities.filter((city) =>
        `${city.name} ${city.country} ${city.region}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="cities page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Atlas / Places</p><h1 className="page-title">Cities</h1><p className="page-description">A field guide to places with a character of their own.</p></div>
                <span className="page-count">{demoCities.length} places</span>
            </header>
            <div className="page-toolbar"><input className="search-field" aria-label="Search cities" placeholder="Search city, country, or region..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="cities-list data-grid">
                {cities.map((city) => (
                    <article className="city-card data-card" key={city.id}>
                        <div className="card-topline"><span className="eyebrow">{city.country}</span><span className="pill">{city.region}</span></div>
                        <h2>{city.name}</h2>
                        <p>{city.description}</p>
                        <div className="card-footer"><span className="meta-text">Population</span><strong style={{ color: "var(--ink)", fontSize: 13 }}>{city.population}</strong></div>
                    </article>
                ))}
                {cities.length === 0 && <p className="empty-state">No cities match that search.</p>}
            </div>
        </section>
    );
}

export default Cities;