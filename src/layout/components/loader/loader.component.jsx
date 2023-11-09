import React, { Component } from "react";
import "./loader.style.css";
import Lottie from "react-lottie-player";
import circular from "./loading.json";
// import marfit from "../../../assets/image_1.png";

export default class Loader extends Component {
	render() {
		return (
			<div className="loader">
				<Lottie loop play animationData={circular} style={{ width: 70, height: 70 }} />
			</div>
		);
	}
}
