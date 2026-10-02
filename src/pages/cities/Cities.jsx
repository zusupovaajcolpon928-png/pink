import { useEffect, useState } from "react";
import axios from "axios";
import "./Cities.css";

function Cities() {
    const [query, setQuery] = useState("");
    const [allCities, setAllCities] = useState([]);

    useEffect(() => {
        axios.get("https://fooapi.com/api/cities")
            .then(({ data }) => {
                const collection = data?.data;
                setAllCities(Array.isArray(collection?.features) ? collection.features : []);
            })
            .catch((error) => console.error("FooAPI cities request failed:", error));
    }, []);

    const cities = allCities.filter((city) =>
        `${city.properties?.city ?? ""} ${city.properties?.country ?? ""} ${city.id}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="cities page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Atlas / Places</p><h1 className="page-title">Cities</h1><p className="page-description">A field guide to places with a character of their own.</p></div>
                <span className="page-count">{allCities.length} places</span>
            </header>
            <div className="page-toolbar"><input className="search-field" aria-label="Search cities" placeholder="Search city, country, or region..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="cities-list data-grid">
                {cities.map((city, index) => (
                    <article className="city-card data-card" key={`${city.id}-${index}`}>
                        <div className="card-topline"><span className="eyebrow">{city.properties?.country}</span><span className="pill">{city.properties?.iso2}</span></div>
                        <h2>{city.properties?.city ?? city.id}</h2>
                        <p>{city.properties?.country}</p>
                        <div className="card-footer"><span className="meta-text">ID</span><strong style={{ color: "var(--ink)", fontSize: 13 }}>{city.id}</strong></div>
                    </article>
                ))}
                {cities.length === 0 && <p className="empty-state">No cities match that search.</p>}
            </div>
        </section>
    );
}

export default Cities;