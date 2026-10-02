
import { useEffect, useState } from "react";
import axios from "axios";
import "./Todos.css";

function Todos() {
    const [apiTodos, setApiTodos] = useState([]);
    const [addedTodos, setAddedTodos] = useState([]);
    const [completedOverrides, setCompletedOverrides] = useState({});
    const [draft, setDraft] = useState("");

    useEffect(() => {
        axios.get("https://fooapi.com/api/todos")
            .then(({ data }) => setApiTodos(Array.isArray(data?.data) ? data.data : []))
            .catch((error) => console.error("FooAPI todos request failed:", error));
    }, []);

    const todos = [
        ...apiTodos.map((todo) => ({
            ...todo,
            title: todo.todo,
            completed: completedOverrides[todo.id] ?? todo.closed,
            due: todo.state,
            tag: `User ${todo.userId}`,
        })),
        ...addedTodos,
    ];
    const completed = todos.filter((todo) => todo.completed).length;

    function addTodo(event) {
        event.preventDefault();
        const title = draft.trim();
        if (!title) return;
        setAddedTodos((current) => [...current, { id: Date.now(), title, completed: false, due: "No date", tag: "Personal" }]);
        setDraft("");
    }

    function toggleTodo(id) {
        setCompletedOverrides((current) => ({
            ...current,
            [id]: !todos.find((todo) => todo.id === id)?.completed,
        }));
    }

    return (
        <section className="todos page-view">
            <header className="page-intro">
                <div><p className="page-kicker">Workspace / Planning</p><h1 className="page-title">To-do list</h1><p className="page-description">Small steps, clearly in view.</p></div>
                <span className="page-count">{completed} of {todos.length} complete</span>
            </header>
            <form className="inline-form" onSubmit={addTodo}>
                <input className="form-field" aria-label="New task" placeholder="Add a task to your list..." value={draft} onChange={(event) => setDraft(event.target.value)} />
                <button className="action-button" type="submit">Add task</button>
            </form>
            <div className="todos-list data-grid">
                {todos.map((todo) => (
                    <article className={`todo-card data-card ${todo.completed ? "todo-done" : ""}`} key={todo.id}>
                        <div className="card-topline"><span className="pill">{todo.tag}</span><input className="todo-toggle" type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} aria-label={`${todo.completed ? "Mark incomplete" : "Complete"}: ${todo.title}`} /></div>
                        <h2>{todo.title}</h2>
                        <div className="card-footer"><span className="meta-text">Due {todo.due}</span><span className={`pill ${todo.completed ? "" : "pill-wine"}`}>{todo.completed ? "Done" : "In progress"}</span></div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Todos;

