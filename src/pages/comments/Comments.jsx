
import { useState } from "react";
import { demoComments } from "../../data/demoData.js";
import "./Comments.css";

function Comments() {
    const [comments, setComments] = useState(demoComments);
    const [draft, setDraft] = useState("");

    function addComment(event) {
        event.preventDefault();
        const body = draft.trim();
        if (!body) return;
        setComments((current) => [{ id: Date.now(), name: "You", initials: "YO", date: "Just now", body }, ...current]);
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






