import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Users from "./pages/users/Users.jsx";
import Todos from "./pages/todos/Todos.jsx";
import Products from "./pages/products/Products.jsx";
import Posts from "./pages/posts/Posts.jsx";
import Comments from "./pages/comments/Comments.jsx";
import Images from "./pages/images/Images.jsx";
import Movies from "./pages/movies/Movies.jsx";
import Countries from "./pages/countries/Countries.jsx";
import Cities from "./pages/cities/Cities.jsx";
import Custom from "./pages/custom/Custom.jsx";
import "./App.css";

const sections = [
	{ path: "/users", label: "Users", component: Users },
	{ path: "/todos", label: "Todos", component: Todos },
	{ path: "/products", label: "Products", component: Products },
	{ path: "/posts", label: "Posts", component: Posts },
	{ path: "/comments", label: "Comments", component: Comments },
	{ path: "/images", label: "Images", component: Images },
	{ path: "/movies", label: "Movies", component: Movies },
	{ path: "/countries", label: "Countries", component: Countries },
	{ path: "/cities", label: "Cities", component: Cities },
	{ path: "/custom", label: "Custom API", component: Custom },
];

function App() {
	return (
		<div className="app-shell">
			<header className="app-header">
				<NavLink className="app-brand" to="/users">API Studio</NavLink>
				<nav className="app-nav" aria-label="Main navigation">
					{sections.map(({ path, label }) => (
						<NavLink className="app-nav-link" key={path} to={path}>
							{label}
						</NavLink>
					))}
				</nav>
			</header>
			<main className="app-content">
				<Routes>
					{sections.map(({ path, component: Page }) => (
						<Route key={path} path={path} element={<Page />} />
					))}
					<Route path="*" element={<Navigate to="/users" replace />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;

