
import { useEffect, useState } from "react";
import axios from "axios";
import "./Comments.css";

function Comments() {
    const [apiComments, setApiComments] = useState([]);
    const [addedComments, setAddedComments] = useState([]);
    const [draft, setDraft] = useState("");

    useEffect(() => {
        axios.get("https://fooapi.com/api/comments")
            .then(({ data }) => setApiComments(Array.isArray(data?.data) ? data.data : []))
            .catch((error) => console.error("FooAPI comments request failed:", error));
    }, []);

    const comments = [
        ...addedComments,
        ...apiComments.map((comment) => ({
            ...comment,
            name: `${comment.user?.name ?? ""} ${comment.user?.lastname ?? ""}`.trim(),
            initials: `${comment.user?.name?.[0] ?? ""}${comment.user?.lastname?.[0] ?? ""}`,
            body: comment.comment,
            date: `${comment.reactions} reactions`,
        })),
    ];

    function addComment(event) {
        event.preventDefault();
        const body = draft.trim();
        if (!body) return;
        setAddedComments((current) => [{ id: Date.now(), name: "You", initials: "YO", date: "Just now", body }, ...current]);
        setDraft("");
    }

    return (
        <section className="comments page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Workspace / Conversation</p><h1 className="page-title">Comments</h1><p className="page-description">Recent notes and feedback from the team.</p></div>
                <span className="page-count">{comments.length} notes</span>
            </header>
            <form className="inline-form" onSubmit={addComment}>
                <input className="form-field" aria-label="Write a comment" placeholder="Share a thought with the team..." value={draft} onChange={(event) => setDraft(event.target.value)} />
                <button className="action-button" type="submit">Add note</button>
            </form>
            <div className="comments-list data-grid">
                {comments.map((comment) => (
                    <article className="comment-card data-card" key={comment.id}>
                        <div className="card-topline"><span className="avatar-mark">{comment.initials}</span><div style={{ flex: 1 }}><h2>{comment.name}</h2><span className="meta-text">{comment.date}</span></div><span className="eyebrow">Note</span></div>
                        <p>{comment.body}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Comments;






