import { useState } from "react";
import { demoPosts } from "../../data/demoData.js";
import "./Posts.css";

function Posts() {
    const [query, setQuery] = useState("");
    const posts = demoPosts.filter((post) =>
        `${post.title} ${post.category} ${post.author} ${post.body}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="posts page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Journal / Stories</p><h1 className="page-title">Latest writing</h1><p className="page-description">Notes from the studio, the field, and everywhere in between.</p></div>
                <span className="page-count">{demoPosts.length} stories</span>
            </header>
            <div className="page-toolbar"><input className="search-field" aria-label="Search stories" placeholder="Search stories or authors..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="posts-list data-grid">
                {posts.map((post) => (
                    <article className="post-card data-card" key={post.id}>
                        <div className="card-topline"><span className="pill pill-wine">{post.category}</span><span className="meta-text">{post.readTime} read</span></div>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <div className="card-footer"><span className="meta-text">{post.author}</span><span className="meta-text">{post.date}</span></div>
                    </article>
                ))}
                {posts.length === 0 && <p className="empty-state">No stories match that search.</p>}
            </div>
        </section>
    );
}

export default Posts;

