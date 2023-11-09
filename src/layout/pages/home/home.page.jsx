import React from "react";
import { Link } from "react-router-dom";
import "./home.styles.css";

function Home() {
	return (
		<div className="home-page-container">
			<h1>Home</h1>
			<Link to="/products">Go to Products</Link>
		</div>
	);
}

export default Home;
