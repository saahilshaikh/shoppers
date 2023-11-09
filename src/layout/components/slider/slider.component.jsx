import React, { useEffect } from "react";
import "./slider.style.css";
import Card from "../card/card.component";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import Lottie from "react-lottie-player";
import loading from "../../../assets/json/loading.json";

const Slider = ({ title = "", data = [] }) => {
	useEffect(() => {
		Swiper.use([Navigation]);
		new Swiper(".swiper-container", {
			observer: true,
			breakpoints: {
				320: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				640: {
					slidesPerView: "auto",
					spaceBetween: 20,
				},
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}, []);
	return (
		<div className="card">
			<div className="card-title">
				<div className="card-title-mini">
					<p>{title}</p>
					<div className="lines">
						<div className="horizontal"></div>
						<div className="rotated-line">
							<div className="line-through"></div>
							<div className="line-through"></div>
						</div>
						<div className="horizontal"></div>
					</div>
				</div>
			</div>
			<div className="slider">
				{data.length > 0 ? (
					<div className="swiper-container">
						<div className="swiper-wrapper">
							{data.map((item, index) => (
								<div className="swiper-slide" key={index}>
									<Card item={item} />
								</div>
							))}
						</div>
						<div className="swiper-button-prev"></div>
						<div className="swiper-button-next"></div>
					</div>
				) : (
					<Lottie loop play animationData={loading} style={{ width: 100, height: 100 }} />
				)}
			</div>
		</div>
	);
};
export default Slider;
