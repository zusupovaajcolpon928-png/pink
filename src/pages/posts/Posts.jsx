import { useEffect, useState } from "react";
import axios from "axios";
import "./Posts.css";

function Posts() {
    const [query, setQuery] = useState("");
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        axios.get("https://fooapi.com/api/posts")
            .then(({ data }) => setAllPosts(Array.isArray(data?.data) ? data.data : []))
            .catch((error) => console.error("FooAPI posts request failed:", error));
    }, []);

    const posts = allPosts.filter((post) =>
        `${post.title} ${post.content} ${post.user?.name} ${post.tags?.join(" ")}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="posts page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Journal / Stories</p><h1 className="page-title">Latest writing</h1><p className="page-description">Notes from the studio, the field, and everywhere in between.</p></div>
                <span className="page-count">{allPosts.length} stories</span>
            </header>
            <div className="page-toolbar"><input className="search-field" aria-label="Search stories" placeholder="Search stories or authors..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="posts-list data-grid">
                {posts.map((post) => (
                    <article className="post-card data-card" key={post.id}>
                        <div className="card-topline"><span className="pill pill-wine">{post.visibility}</span><span className="meta-text">{post.reactions} reactions</span></div>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <div className="card-footer"><span className="meta-text">{post.user?.name} {post.user?.lastname}</span><span className="meta-text">{post.tags?.join(" · ")}</span></div>
                    </article>
                ))}
                {posts.length === 0 && <p className="empty-state">No stories match that search.</p>}
            </div>
        </section>
    );
}

export default Posts;

