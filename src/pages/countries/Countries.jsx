import { useState } from "react";
import { demoCountries } from "../../data/demoData.js";
import "./Countries.css";

function Countries() {
    const [query, setQuery] = useState("");
    const countries = demoCountries.filter((country) =>
        `${country.name} ${country.capital} ${country.region}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="countries page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Atlas / Places</p><h1 className="page-title">Countries</h1><p className="page-description">A selection of places, capitals, and regions.</p></div>
                <span className="page-count">{demoCountries.length} places</span>
            </header>
            <div className="page-toolbar"><input className="search-field" aria-label="Search countries" placeholder="Search country, capital, or region..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="countries-list data-grid">
                {countries.map((country) => (
                    <article className="country-card data-card" key={country.id}>
                        <div className="card-topline"><span className="country-code">{country.flag}</span><span className="pill">{country.region}</span></div>
                        <h2>{country.name}</h2>
                        <p>Capital · {country.capital}</p>
                        <div className="card-footer"><span className="meta-text">Population</span><strong style={{ color: "var(--ink)", fontSize: 13 }}>{country.population}</strong></div>
                    </article>
                ))}
                {countries.length === 0 && <p className="empty-state">No countries match that search.</p>}
            </div>
        </section>
    );
}

export default Countries;