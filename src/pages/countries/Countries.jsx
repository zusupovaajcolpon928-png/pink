import { useEffect, useState } from "react";
import axios from "axios";
import "./Countries.css";

function Countries() {
    const [query, setQuery] = useState("");
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        axios.get("https://fooapi.com/api/countries")
            .then(({ data }) => {
                const collection = data?.data;
                setAllCountries(Array.isArray(collection?.features) ? collection.features : []);
            })
            .catch((error) => console.error("FooAPI countries request failed:", error));
    }, []);

    const countries = allCountries.filter((country) =>
        `${country.properties?.name ?? ""} ${country.id}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="countries page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Atlas / Places</p><h1 className="page-title">Countries</h1><p className="page-description">A selection of places, capitals, and regions.</p></div>
                <span className="page-count">{allCountries.length} places</span>
            </header>
            <div className="page-toolbar"><input className="search-field" aria-label="Search countries" placeholder="Search country, capital, or region..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="countries-list data-grid">
                {countries.map((country) => (
                    <article className="country-card data-card" key={country.id}>
                        <div className="card-topline"><span className="country-code">{country.id}</span><span className="pill">GeoJSON</span></div>
                        <h2>{country.properties?.name ?? country.id}</h2>
                        <p>Country feature</p>
                        <div className="card-footer"><span className="meta-text">ID</span><strong style={{ color: "var(--ink)", fontSize: 13 }}>{country.id}</strong></div>
                    </article>
                ))}
                {countries.length === 0 && <p className="empty-state">No countries match that search.</p>}
            </div>
        </section>
    );
}

export default Countries;