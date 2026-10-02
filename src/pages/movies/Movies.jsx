import { useEffect, useState } from "react";
import axios from "axios";
import "./Movies.css";

function Movies() {
    const [query, setQuery] = useState("");
    const [theme, setTheme] = useState("All themes");
    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
        axios.get("https://fooapi.com/api/movies")
            .then(({ data }) => setAllMovies(Array.isArray(data?.data) ? data.data : []))
            .catch((error) => console.error("FooAPI movies request failed:", error));
    }, []);

    const themes = ["All themes", ...new Set(allMovies.flatMap((movie) => movie.genre.split(", ").map((genre) => genre.trim())))];
    const movies = allMovies.filter((movie) =>
        (theme === "All themes" || movie.genre.split(", ").map((genre) => genre.trim()).includes(theme)) &&
        `${movie.title} ${movie.genre} ${movie.year} ${movie.plot}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="movies page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Library / Screen</p><h1 className="page-title">Фильмотека</h1><p className="page-description">Фильмы по настроению, жанру и истории. Выберите фильм, чтобы открыть отрывки и трейлеры на YouTube.</p></div>
                <span className="page-count">{allMovies.length} фильмов</span>
            </header>
            <div className="page-toolbar">
                <input className="search-field" aria-label="Search films" placeholder="Найти по названию, жанру или теме..." value={query} onChange={(event) => setQuery(event.target.value)} />
                <select className="filter-select" aria-label="Filter films by theme" value={theme} onChange={(event) => setTheme(event.target.value)}>
                    {themes.map((item) => <option key={item}>{item}</option>)}
                </select>
            </div>
            <div className="movies-list data-grid">
                {movies.map((movie) => (
                    <article className="movie-card data-card" key={movie.id}>
                        <div className="movie-poster"><span>{movie.title}</span></div>
                        <div className="card-topline"><span className="pill">{movie.genre}</span><span className="meta-text">{movie.year}</span></div>
                        <span className="eyebrow">{movie.director}</span>
                        <p>{movie.plot}</p>
                        <div className="card-footer"><span className="pill pill-wine">★ {movie.imdbRating}</span></div>
                        <a
                            className="action-button movie-watch-link"
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} official trailer movie clip`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Смотреть отрывки на YouTube ↗
                        </a>
                    </article>
                ))}
                {movies.length === 0 && <p className="empty-state">По этому запросу фильмов не найдено.</p>}
            </div>
        </section>
    );
}

export default Movies;