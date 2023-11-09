import React from "react";
import "./notFound.style.css";
import Lottie from "react-lottie-player";
import notfound from "../../../assets/json/lf30_editor_SvDNsR.json";

const NotFound = () => {
	return (
		<div className="not-found-container">
			<div className="not-found-box">
				<div>
					<Lottie loop play animationData={notfound} style={{ width: 300, height: 300 }} />
				</div>

				<p style={{ fontSize: "30px", color: "#313131", marginBottom: "10px" }}>Nothing Found</p>
				<p style={{ color: "#717171", marginBottom: "20px" }}>We could'nt find what you are looking for.</p>
				<a href="/" style={{ backgroundColor: "#fb6b25", textDecoration: "none", padding: "0.8rem 1.2rem", color: "#fff", borderRadius: "3px" }}>
					Go Back Home
				</a>
			</div>
		</div>
	);
};

export default NotFound;
