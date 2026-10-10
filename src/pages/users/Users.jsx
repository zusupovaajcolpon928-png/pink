
import { useState } from "react";
import { demoUsers } from "../../data/demoData.js";
import "./Users.css";

function Users() {
    const [query, setQuery] = useState("");
    const users = demoUsers.filter((user) =>
        `${user.name} ${user.email} ${user.role} ${user.city}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="users page-view">
            <header className="page-intro">
                <div>
                    <p className="page-kicker">Workspace / Directory</p>
                    <h1 className="page-title">People</h1>
                    <p className="page-description">A small directory of the people behind the work.</p>
                </div>
                <span className="page-count">{demoUsers.length} members</span>
            </header>
            <div className="page-toolbar">
                <input className="search-field" aria-label="Search people" placeholder="Search name, role, or city..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <div className="users-list data-grid">
                {users.map((user) => (
                    <article className="user-card data-card" key={user.id}>
                        <div className="card-topline">
                            <span className={`avatar-mark avatar-${user.color}`}>{user.name.split(" ").map((part) => part[0]).join("")}</span>
                            <span className="pill">{user.role}</span>
                        </div>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <div className="card-footer"><span className="meta-text">{user.city}</span><span className="meta-text">ID {String(user.id).padStart(3, "0")}</span></div>
                    </article>
                ))}
                {users.length === 0 && <p className="empty-state">No people match that search.</p>}
            </div>
        </section>
    );
}

export default Users;

