
import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

function Users() {
    const [query, setQuery] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        axios.get("https://fooapi.com/api/users")
            .then(({ data }) => setAllUsers(Array.isArray(data?.data) ? data.data : []))
            .catch((error) => console.error("FooAPI users request failed:", error));
    }, []);

    const users = allUsers.filter((user) =>
        `${user.name} ${user.lastname} ${user.email} ${user.username} ${user.country}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="users page-view">
            <header className="page-intro">
                <div>
                    <p className="page-kicker">Workspace / Directory</p>
                    <h1 className="page-title">People</h1>
                    <p className="page-description">A small directory of the people behind the work.</p>
                </div>
                <span className="page-count">{allUsers.length} members</span>
            </header>
            <div className="page-toolbar">
                <input className="search-field" aria-label="Search people" placeholder="Search name, role, or city..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <div className="users-list data-grid">
                {users.map((user) => (
                    <article className="user-card data-card" key={user.id}>
                        <div className="card-topline">
                            <span className={`avatar-mark avatar-${["rose", "blue", "gold", "green"][Number(user.id) % 4]}`}>{`${user.name?.[0] ?? ""}${user.lastname?.[0] ?? ""}`}</span>
                            <span className="pill">{user.gender}</span>
                        </div>
                        <h2>{`${user.name} ${user.lastname}`}</h2>
                        <p>{user.email}</p>
                        <div className="card-footer"><span className="meta-text">{user.country}</span><span className="meta-text">ID {String(user.id).padStart(3, "0")}</span></div>
                    </article>
                ))}
                {users.length === 0 && <p className="empty-state">No people match that search.</p>}
            </div>
        </section>
    );
}

export default Users;

