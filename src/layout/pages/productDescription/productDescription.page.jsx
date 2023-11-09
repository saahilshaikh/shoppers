import React from "react";
import "./productDescription.style.css";
import Slider from "../../components/slider/slider.component";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import empty from "../../../assets/json/empty.json";
import Loader from "../../components/loader/loader.component";
import moment from "moment";
import ReactImageMagnify from "react-image-magnify";
import { Link } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { Helmet } from "react-helmet";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { productData } from "../../../utilities/productData";
import Swal from "sweetalert2";

const pageVariants = {
	initial: {
		opacity: 0,
		x: "-100vw",
	},
	in: {
		opacity: 1,
		x: 0,
	},
	out: {
		opacity: 0,
		x: 0,
	},
};

const pageTransition = {
	type: "spring",
	damping: 20,
	stiffness: 100,
};

export default class ProductDesc extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeImage: 0,
			isWished: false,
			cart: [],
			product: {},
			simProducts: [],
			sizeSelected: "",
			usersQuantity: 1,
			loading: true,
			colorSelected: "",
			colors: [],
			ratings: [],
			stars: 0,
			sizeIndex: 0,
			checked: false,
			checking: false,
			emboss: false,
			embossYes: false,
			embossText: "",
			showSlider: false,
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.handleInit();
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleInit = () => {
		var loc = window.location.href.split("/");
		var productId = loc[loc.length - 1];
		var products = [];
		var productShow = {};
		var simProducts = [];
		var simProducts2 = [];
		var colors = [];
		Object.keys(productData).forEach((key) => {
			var product = { ...productData[key], id: key };
			if (product.id.toString() === productId.toString()) {
				productShow = product;
			}
			products.push(product);
		});
		products.forEach((product) => {
			if (product.category.toLowerCase() === productShow.category.toLowerCase()) {
				if (product.subCategory.toLowerCase() === productShow.subCategory.toLowerCase()) {
					if (product.id !== productId) {
						if (product.quantity !== 0 && simProducts.length < 12) {
							simProducts.push(product);
						}
					}
				} else {
					if (product.id !== productId) {
						if (product.quantity !== 0 && simProducts2.length < 12) {
							simProducts2.push(product);
						}
					}
				}
			}
		});
		products.forEach(async (product) => {
			if (product.category.toLowerCase() === productShow.category.toLowerCase()) {
				if (product.subCategory.toLowerCase() === productShow.subCategory.toLowerCase()) {
					if (productShow.batch && product.batch === productShow.batch) {
						colors.push(product);
					}
				}
			}
		});
		this.setState({
			product: productShow,
			simProducts: simProducts,
			simProducts2: simProducts2,
			colors: colors,
			cart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [],
			loading: false,
		});
	};

	AddToCart = () => {
		if (!this.state.product.noSize) {
			if (this.state.sizeSelected !== "") {
				this.setState({
					addLoading: true,
				});
				let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
				if (cart.length > 0) {
					cart.forEach((item) => {
						if (item.id !== this.state.product.id) {
							let tempCart = {};
							tempCart.id = this.state.product.id;
							tempCart.byeQuantity = this.state.usersQuantity;
							tempCart.size = this.state.sizeSelected;
							tempCart.emboss = this.state.embossYes;
							tempCart.embossText = this.state.embossText ? this.state.embossText : null;
							cart.push(tempCart);
							this.setState(
								{
									cart: cart,
									addloading: false,
								},
								() => {
									var localCart = JSON.stringify(this.state.cart);
									localStorage.setItem("cart", localCart);
									Swal.fire({
										icon: "success",
										title: "Success",
										text: "Added to cart",
										confirmButtonColor: "#fb6b25",
									});
								},
							);
						} else {
							Swal.fire({
								icon: "error",
								title: "Cart!",
								text: "Item already exist in your cart",
								confirmButtonColor: "#fb6b25",
							});
							this.setState({
								addLoading: false,
							});
						}
					});
				} else {
					let tempCart = {};
					tempCart.id = this.state.product.id;
					tempCart.byeQuantity = this.state.usersQuantity;
					tempCart.size = this.state.sizeSelected;
					tempCart.emboss = this.state.embossYes;
					tempCart.embossText = this.state.embossText ? this.state.embossText : null;
					cart.push(tempCart);
					this.setState(
						{
							cart: cart,
							addloading: false,
						},
						() => {
							var localCart = JSON.stringify(this.state.cart);
							localStorage.setItem("cart", localCart);
							Swal.fire({
								icon: "success",
								title: "Success",
								text: "Added to cart",
								confirmButtonColor: "#fb6b25",
							});
						},
					);
				}
			} else {
				Swal.fire({
					icon: "error",
					title: "Size!",
					text: "Please select a size!",
					confirmButtonColor: "#fb6b25",
				});
			}
		} else {
			this.setState({
				addLoading: true,
			});
			var cart2 = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
			if (cart2.length > 0) {
				cart2.forEach((item) => {
					if (item.id !== this.state.product.id) {
						let tempCart = {};
						tempCart.id = this.state.product.id;
						tempCart.byeQuantity = this.state.usersQuantity;
						tempCart.size = "null";
						tempCart.emboss = this.state.embossYes;
						tempCart.embossText = this.state.embossText ? this.state.embossText : null;
						cart2.push(tempCart);
						this.setState(
							{
								cart: cart2,
								addloading: false,
							},
							() => {
								var localCart = JSON.stringify(this.state.cart);
								localStorage.setItem("cart", localCart);
								Swal.fire({
									icon: "success",
									title: "Success",
									text: "Added to cart",
									confirmButtonColor: "#fb6b25",
								});
							},
						);
					} else {
						this.setState({
							addLoading: false,
						});
						Swal.fire({
							icon: "error",
							title: "Cart!",
							text: "Item already exist in your cart",
							confirmButtonColor: "#fb6b25",
						});
					}
				});
			} else {
				let tempCart = {};
				tempCart.id = this.state.product.id;
				tempCart.byeQuantity = this.state.usersQuantity;
				tempCart.size = "null";
				tempCart.emboss = this.state.embossYes;
				tempCart.embossText = this.state.embossText ? this.state.embossText : null;
				cart2.push(tempCart);
				this.setState(
					{
						cart: cart2,
						addloading: false,
					},
					() => {
						var localCart = JSON.stringify(this.state.cart);
						localStorage.setItem("cart", localCart);
						Swal.fire({
							icon: "success",
							title: "Success",
							text: "Added to cart",
							confirmButtonColor: "#fb6b25",
						});
					},
				);
			}
		}
	};

	handleByeNow = () => {
		if (!this.state.product.noSize) {
			if (this.state.sizeSelected !== "") {
				this.setState({
					addLoading: true,
				});
				let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
				if (cart.length > 0) {
					cart.forEach((item) => {
						let tempCart = {};
						tempCart.id = this.state.product.id;
						tempCart.byeQuantity = this.state.usersQuantity;
						tempCart.size = this.state.sizeSelected;
						tempCart.emboss = this.state.embossYes;
						tempCart.embossText = this.state.embossText ? this.state.embossText : null;
						if (item.id !== this.state.product.id) {
							cart.push(tempCart);
							this.setState(
								{
									cart: cart,
									addloading: false,
								},
								() => {
									var localCart = JSON.stringify(this.state.cart);
									localStorage.setItem("cart", localCart);
									window.location.href = "/cart";
								},
							);
						} else {
							this.setState({
								addLoading: false,
							});
							window.location.href = "/cart";
						}
					});
				} else {
					let tempCart = {};
					tempCart.id = this.state.product.id;
					tempCart.byeQuantity = this.state.usersQuantity;
					tempCart.size = this.state.sizeSelected;
					tempCart.emboss = this.state.embossYes;
					tempCart.embossText = this.state.embossText ? this.state.embossText : null;
					cart.push(tempCart);
					this.setState(
						{
							cart: cart,
							addloading: false,
						},
						() => {
							var localCart = JSON.stringify(this.state.cart);
							localStorage.setItem("cart", localCart);
							window.location.href = "/cart";
						},
					);
				}
			} else {
				Swal.fire({
					icon: "error",
					title: "Size!",
					text: "Please select a size!",
					confirmButtonColor: "#fb6b25",
				});
			}
		} else {
			this.setState({
				addLoading: true,
			});
			var cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
			if (cart.length > 0) {
				cart.forEach((item) => {
					let tempCart = {};
					tempCart.id = this.state.product.id;
					tempCart.byeQuantity = this.state.usersQuantity;
					tempCart.size = "null";
					tempCart.emboss = this.state.embossYes;
					tempCart.embossText = this.state.embossText ? this.state.embossText : null;
					if (item.id !== this.state.product.id) {
						cart.push(tempCart);
						this.setState(
							{
								cart: cart,
								addloading: false,
							},
							() => {
								var localCart = JSON.stringify(this.state.cart);
								localStorage.setItem("cart", localCart);
								window.location.href = "/cart";
							},
						);
					} else {
						this.setState({
							addLoading: false,
						});
						window.location.href = "/cart";
					}
				});
			} else {
				let tempCart = {};
				tempCart.id = this.state.product.id;
				tempCart.byeQuantity = this.state.usersQuantity;
				tempCart.size = "null";
				tempCart.emboss = this.state.embossYes;
				tempCart.embossText = this.state.embossText ? this.state.embossText : null;
				cart.push(tempCart);
				this.setState(
					{
						cart: cart,
						addloading: false,
					},
					() => {
						var localCart = JSON.stringify(this.state.cart);
						localStorage.setItem("cart", localCart);
						window.location.href = "/cart";
					},
				);
			}
		}
	};

	closeImageViewer = () => {
		document.body.setAttribute("style", "");
		window.scrollTo(0, this.props.windowOffSet);
		this.setState({
			showSlider: false,
			activeImage: 0,
		});
	};

	handleClickImage = () => {
		if (window.innerWidth <= 768) {
			this.setState({
				showSlider: true,
			});
		}
	};

	handleImageChange = (e) => {
		console.log(e);
		this.setState({
			activeImage: e,
		});
	};

	handleShowImage = () => {
		if (window.screen.width <= 678) {
			this.windowOffSet = window.scrollY;
			document.body.setAttribute("style", `position: fixed; top: -${this.windowOffSet}px; left: 0; right: 0;`);
			this.setState({
				showSlider: true,
			});
		}
	};

	render() {
		var stars = 0;
		var review = 0;
		var q = [];
		if (this.state.product.noSize) {
			for (var x = 1; x <= this.state.product.quantity; x++) {
				if (x <= this.state.product.max) {
					q.push(x);
				}
			}
		} else {
			if (this.state.sizeSelected !== "") {
				this.state.product.sizes.forEach((size) => {
					if (size.name === this.state.sizeSelected) {
						for (var x = 1; x <= size.quantity; x++) {
							if (x <= this.state.product.max) {
								q.push(x);
							}
						}
					}
				});
			} else {
				for (let x = 0; x <= 0; x++) {
					q.push(x);
				}
			}
		}
		if (this.state.product.title) {
			this.state.product.ratings.forEach((rate) => {
				stars += rate.stars;
				if (rate.review.length > 0) {
					review += 1;
				}
			});
			stars = Math.round(stars / this.state.product.ratings.length);
		}
		return (
			<>
				{this.state.loading ? (
					<Loader />
				) : (
					<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="product-desc-container">
						<div className="categorylist-breadcrumb">
							<div className="breadcrumb-menu">
								<div className="bd-menu-list">
									<a href="/" style={{ cursor: "pointer" }}>
										Home
									</a>
									<a href="/">
										<i className="fas fa-chevron-right"></i>
									</a>
									<a href={"/products"} style={{ cursor: "pointer" }}>
										Product
									</a>
									<a href="/products">
										<i className="fas fa-chevron-right"></i>
									</a>
									<a href={"/product/" + this.state.product.id} style={{ cursor: "pointer" }}>
										{this.state.product.title}
									</a>
								</div>
							</div>
						</div>

						<div className="product-container">
							{this.state.product.title ? (
								<div className="product-desc">
									<Helmet>
										<meta charSet="utf-8" />
										<title>{this.state.product.title}</title>
										<link rel="canonical" href={"/product/" + this.state.product.id} />
									</Helmet>
									<div className="all-product-image">
										<div className="carousal-section">
											<div className="product-images">
												{this.state.product.images &&
													this.state.product.images.map((item, index) => (
														<div key={index}>
															{this.state.activeImage === index ? (
																<div className="preview-image activeImage" key={index}>
																	<img src={this.state.product.images[index]} alt="slider Images" />
																</div>
															) : (
																<div className="preview-image" key={index}>
																	<img
																		src={item}
																		alt="slider Images"
																		onClick={() => {
																			this.setState({
																				activeImage: index,
																			});
																		}}
																	/>
																</div>
															)}
														</div>
													))}
											</div>

											<div className="product-image">
												{this.state.product.images ? (
													<>
														<div className="product-image-container">
															<ReactImageMagnify
																{...{
																	className: "image-container",
																	imageClassName: "product-image-image",
																	enlargedImageContainerClassName: "product-zoom-container",
																	enlargedImageClassName: "product-zoom-image",
																	smallImage: {
																		alt: "product image",
																		isFluidWidth: true,
																		src: this.state.product.images[this.state.activeImage],
																	},
																	largeImage: {
																		src: this.state.product.images[this.state.activeImage],
																		width: 1200,
																		height: 1800,
																	},
																	lensStyle: {
																		backgroundColor: "transparent",
																	},
																}}
															/>
														</div>
														<div className="product-image-container2">
															{!this.state.showSlider ? (
																<div className="product-image-carousel">
																	<Carousel infiniteLoop={true} onChange={this.handleImageChange} onClickItem={this.handleShowImage}>
																		{this.state.product.images.map((image, index) => {
																			return (
																				<div className="slider-image-container" key={index}>
																					<img src={image} alt="product" />
																				</div>
																			);
																		})}
																	</Carousel>
																</div>
															) : (
																<div className="image-view-box">
																	<ImageViewer
																		backgroundStyle={{
																			backgroundColor: "#fff",
																		}}
																		src={this.state.product.images}
																		currentIndex={this.state.activeImage}
																		onClose={this.closeImageViewer}
																	/>
																</div>
															)}
														</div>
													</>
												) : null}
											</div>
										</div>
										<div className="buying-options">
											{this.state.product.quantity > 0 ? (
												<>
													<div className="option" onClick={this.AddToCart}>
														<i className="fas fa-shopping-cart"></i>
														<p>ADD TO CART</p>
													</div>
													<div className="option" onClick={this.handleByeNow}>
														<i className="fas fa-bolt"></i>
														<p>BUY NOW</p>
													</div>
												</>
											) : (
												<p className="outstock">OUT OF STOCK</p>
											)}
										</div>
									</div>
									<div className="description-section">
										{this.state.product.sale ? (
											<div className="onsale">
												<p>Sale</p>
											</div>
										) : null}
										<div className="product-title">
											<p>{this.state.product.title}</p>
										</div>
										{this.state.product.ratings && this.state.product.ratings.length > 0 ? (
											<div className="rating">
												<div className="rating-header">
													{this.state.product.ratings.length > 0 ? (
														<div className="rating-body">
															<div className="stars">
																<p>{stars}</p>
																<i className="fas fa-star"></i>
															</div>
															<p className="rating-size">
																{this.state.product.ratings.length} ratings {review > 0 ? "& " + review + " reviews" : null}
															</p>
														</div>
													) : null}
												</div>
											</div>
										) : null}
										<div className="price">
											<div className="product-price">
												&#8377;
												{this.state.product.sp + (this.state.embossYes ? this.state.product.embossprice : 0)}
											</div>
											<div className="product-price-linethrough">&#8377;{this.state.product.cp}</div>
											<div className="product-discount">{100 - Math.round((this.state.product.sp / this.state.product.cp) * 100)}% off</div>
										</div>
										<div className="other-details">
											{this.state.product.quantity > 0 ? (
												<>
													<div className="quantity-cont">
														<p className="title-tag">Quantity</p>
														<div className={this.state.sizeSelected === "" && !this.state.product.noSize ? "quantity grey" : "quantity"}>
															<select
																style={{
																	width: "100%",
																	height: "100%",
																	textAlign: "center",
																	cursor: "pointer",
																	border: "none",
																	outline: "none",
																}}
																value={this.state.usersQuantity}
																onChange={(e) => {
																	this.setState({
																		usersQuantity: e.target.value,
																	});
																}}>
																{q.map((qaunt, index) => {
																	return (
																		<option value={qaunt} key={index}>
																			{qaunt}
																		</option>
																	);
																})}
															</select>
														</div>
													</div>
													{this.state.product.noSize ? null : (
														<div className="size-cont">
															<p className="title-tag">Size</p>
															<div className="size">
																{this.state.product.sizes.map((size, index) => {
																	return size.quantity > 0 ? (
																		<p
																			key={index}
																			className={this.state.sizeSelected === size.name ? "sizeSelected" : null}
																			onClick={() => {
																				this.setState({
																					sizeSelected: size.name,
																					usersQuantity: 1,
																					sizeIndex: index,
																				});
																			}}>
																			{size.name.toUpperCase()}
																		</p>
																	) : (
																		<p className="grey">{size.name.toUpperCase()}</p>
																	);
																})}
															</div>
														</div>
													)}
													{this.state.colors.length > 1 ? (
														<div className="color-cont">
															<p className="title-tag">Color</p>
															<div className="colors">
																{this.state.colors.map((color, index) => {
																	if (this.state.product.color === color.color) {
																		return (
																			<Link key={index} className="color color-selected" to={"/product/" + color.id}>
																				<img src={color.images[0]} alt="" />
																				<p>{color.color}</p>
																			</Link>
																		);
																	} else return null;
																})}
																{this.state.colors.map((color, index) => {
																	if (this.state.product.color !== color.color) {
																		return (
																			<Link key={index} target="_blank" rel="noopener noreferrer" className="color" to={"/product/" + color.id}>
																				<img src={color.images[0]} alt="" />
																				<p>{color.color}</p>
																			</Link>
																		);
																	} else return null;
																})}
															</div>
														</div>
													) : null}
												</>
											) : (
												<div className="out-of-stock-text">
													<h1>Sold Out</h1>
													<p>This item is currently out of stock</p>
												</div>
											)}
										</div>
										{this.state.product.emboss === "yes" ? (
											<div className="product-emboss">
												{this.state.emboss === false ? (
													<>
														{this.state.embossYes ? (
															<i
																className="fas fa-check-circle"
																onClick={() => {
																	this.setState({
																		emboss: true,
																		embossYes: false,
																	});
																}}></i>
														) : (
															<i
																onClick={() => {
																	this.setState({
																		emboss: true,
																		embossYes: true,
																	});
																}}
																className="far fa-circle"></i>
														)}
														<p
															onClick={() => {
																this.setState({
																	emboss: true,
																});
															}}>
															Do you want to emboss your text?{" "}
															<span>
																(+&#8377;
																{this.state.product.embossprice})
															</span>
														</p>
													</>
												) : (
													<div className="emboss-field">
														<input placeholder="Please enter your emboss text" maxLength={10} name="embossText" onChange={this.handleChange} value={this.state.embossText} />
														<div className="emboss-buttons">
															<button
																onClick={() => {
																	this.setState({
																		emboss: false,
																		embossYes: this.state.embossText.length > 0 ? true : false,
																	});
																}}>
																<i className="fas fa-check"></i>
															</button>
															<button
																onClick={() => {
																	this.setState({
																		emboss: false,
																		embossYes: false,
																	});
																}}>
																<i className="fas fa-times"></i>
															</button>
														</div>
													</div>
												)}
											</div>
										) : null}
										<div className="product-details">
											<h3>Product Details</h3>
											<p className="product-summary">{this.state.product.description}</p>
											<ul>
												{this.state.product.height ? (
													<li>
														<p className="darkgrey">Height</p>
														<p className="text">{this.state.product.height} cm</p>
													</li>
												) : null}
												{this.state.product.width ? (
													<li>
														<p className="darkgrey">Width</p>
														<p className="text">{this.state.product.width} cm</p>
													</li>
												) : null}
												{this.state.product.thick ? (
													<li>
														<p className="darkgrey">Thickness</p>
														<p className="text">{this.state.product.thick} cm</p>
													</li>
												) : null}
												{this.state.product.specifications &&
													this.state.product.specifications.map((spec, index) => (
														<li key={index}>
															<p className="darkgrey">{spec.title}</p>
															<p className="text">{spec.content}</p>
														</li>
													))}
											</ul>
										</div>
										<div className="rating">
											<div className="rating-header">
												<h3>Ratings & Review</h3>
												{this.state.product.ratings.length > 0 ? (
													<div className="rating-body">
														<div className="stars">
															<p>{stars}</p>
															<i className="fas fa-star"></i>
														</div>
														<p className="rating-size">
															{this.state.product.ratings.length} ratings {review > 0 ? "& " + review + " reviews" : null}
														</p>
													</div>
												) : null}
											</div>
											<div className="review-list">
												{this.state.product.ratings.length > 0 ? (
													this.state.product.ratings.map((rating, index) => {
														return (
															<div className="reviews" key={index}>
																<div className="upper">
																	<div className="stars-mini">
																		<p>{rating.stars}</p>
																		<i className="fas fa-star"></i>
																	</div>
																	<p className="review-text">{rating.review}</p>
																</div>
																<div className="lower">
																	<p className="user-name">{rating.name}</p>
																	<p className="date">on</p>
																	<p className="date">{moment(rating.date.toDate()).format("DD-MM-YYYY")}</p>
																</div>
															</div>
														);
													})
												) : (
													<div className="noratings">
														<p>No ratings or reviews</p>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							) : (
								<div
									style={{
										width: "100%",
										height: "85vh",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										flexDirection: "column",
									}}>
									<Lottie loop play animationData={empty} style={{ width: 200, height: 200 }} />
									<p
										style={{
											fontSize: "16px",
											fontWeight: "bold",
											color: "#313131",
										}}>
										Sorry! we could not find any items
									</p>
								</div>
							)}
						</div>
						{this.state.simProducts.length > 0 ? (
							<>
								<div className="product-like">
									<Slider data={this.state.simProducts} title={"Similar Products"} view={false} />
								</div>
							</>
						) : null}
						{this.state.simProducts2.length > 0 ? (
							<>
								<div className="product-like">
									<Slider data={this.state.simProducts2} title={"You may also like"} view={false} />
								</div>
							</>
						) : null}
						<div className="buying-options-sticky">
							{this.state.product.quantity > 0 ? (
								<>
									<div className="option" onClick={this.AddToCart}>
										<i className="fas fa-shopping-cart"></i>
										<p>ADD TO CART</p>
									</div>
									<div className="option" onClick={this.handleByeNow}>
										<i className="fas fa-bolt"></i>
										<p>BUY NOW</p>
									</div>
								</>
							) : (
								<p className="outstock">OUT OF STOCK</p>
							)}
						</div>
					</motion.div>
				)}
			</>
		);
	}
}
