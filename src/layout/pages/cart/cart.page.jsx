import React from "react";
import { motion } from "framer-motion";
import "./cart.style.css";
import cart from "../../../assets/images/supermarket.svg";
import loc from "../../../assets/images/location.svg";
import pay from "../../../assets/images/pay.svg";
import razorpay from "../../../assets/images/razorpay.png";
import cod from "../../../assets/images/cod.png";
import Lottie from "react-lottie-player";
import loading from "../../../assets/json/loading.json";
import empty from "../../../assets/json/empty.json";
import CheckOutCard from "../../components/checkOutCard/checkOutCard.component";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { codeAvailable, coupons, opdCharges, productData, stores } from "../../../utilities/productData";
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

class Cart extends React.Component {
	constructor(props) {
		super(props);
		for (var i = 1; i <= 4; i++) {
			this["c" + i] = React.createRef();
		}
		this.state = {
			applyPoints: false,
			tab: 1,
			modal: "modal-address",
			modalVerfiy: "modal-verify",
			addresses: [],
			saddresses: [],
			isDefault: false,
			loading: true,
			currentUser: [],
			total: 0,
			shipping: 0,
			rental: 0,
			deposit: 0,
			address: {},
			city: "",
			state: "",
			pin: "",
			cname: "",
			cphone: "",
			cemail: "",
			add: "",
			process1: "process1",
			process2: "process2",
			editAddress: false,
			ogname: "",
			ogaddress: "",
			paymentTab: 1,
			cart: [],
			products: [],
			addressType: "default",
			points: 0,
			country: "",
			coupon: {},
			coupons: [],
			couponCode: "",
			c1: "",
			c2: "",
			c3: "",
			c4: "",
			c5: "",
			c6: "",
			otp: 0,
			showOTP: false,
			opd: 0,
			cod: true,
		};
	}
	async componentDidMount() {
		window.scrollTo(0, 0);
		var cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
		this.setState(
			{
				cart: cart,
				currentUser: "",
				userID: "",
				addAddress: true,
				loading: false,
			},
			async () => {
				var products = [];
				var rental = 0;
				var shipping = 0;
				for (var i = 0; i < cart.length; i++) {
					var product = productData[cart[i].id];
					var prod = product;
					if (prod.sale) {
						prod.sp = prod.special;
					}
					prod.id = product.id;
					prod.byeQuantity = cart[i].byeQuantity;
					prod.size = cart[i].size;
					prod.emboss = cart[i].emboss;
					prod.embossText = cart[i].embossText;
					prod.status = "default";
					products.push(prod);
					rental = rental + (prod.sp + (cart[i].emboss ? prod.embossprice : 0)) * cart[i].byeQuantity;
					shipping = shipping + prod.shippingCharge;
				}
				var total = shipping + rental;
				this.setState({
					products,
					rental,
					shipping,
					total,
					points: 0,
					saddresses: stores,
					cod: codeAvailable,
					opd: opdCharges,
					coupons: coupons,
				});
			},
		);
	}

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	handleIsDefault = () => {
		this.setState({
			isDefault: !this.state.isDefault,
		});
	};

	handleDelete = (e) => {
		var cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
		var newcart = [];
		cart.forEach((item) => {
			if (item.id === e.id) {
			} else {
				newcart.push(item);
			}
		});
		this.setState(
			{
				cart: [],
			},
			() => {
				localStorage.setItem("cart", JSON.stringify(newcart));
				Swal.fire({
					icon: "success",
					title: "Cart",
					text: "Item removed from your cart",
					confirmButtonColor: "#fb6b25",
				});
				this.setState({
					cart: newcart,
				});
			},
		);
	};

	handleRefresh = () => {
		window.location.reload();
	};

	handleSubmit = () => {
		if (this.state.cname === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter your name!",
				confirmButtonColor: "#fb6b25",
			});
		} else if (this.state.cphone === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter contact number!",
				confirmButtonColor: "#fb6b25",
			});
		} else if (this.state.address === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter your address!",
				confirmButtonColor: "#fb6b25",
			});
		} else if (this.state.pin === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter your pincode!",
				confirmButtonColor: "#fb6b25",
			});
		} else if (this.state.city === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter your city!",
				confirmButtonColor: "#fb6b25",
			});
		} else if (this.state.state === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter your state!",
				confirmButtonColor: "#fb6b25",
			});
		} else if (this.state.country === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter your country!",
				confirmButtonColor: "#fb6b25",
			});
		} else {
			var arr = {};
			arr["cname"] = this.state.cname;
			arr["cphone"] = this.state.cphone;
			arr["address"] = this.state.add;
			arr["pin"] = this.state.pin;
			arr["city"] = this.state.city;
			arr["state"] = this.state.state;
			arr["country"] = this.state.country;
			arr["default"] = this.state.isDefault ? this.state.isDefault : this.state.addresses.length === 0 ? true : false;
			if (this.state.email === "") {
				Swal.fire({
					icon: "error",
					title: "Cart",
					text: "Please enter your email address!",
					confirmButtonColor: "#fb6b25",
				});
			} else {
				arr["email"] = this.state.email;
				this.setState({
					modal: "modal-address",
					city: "",
					state: "",
					pin: "",
					cname: "",
					cphone: "",
					add: "",
					address: arr,
					country: "",
					addresses: [...this.state.addresses, arr],
				});
			}
		}
	};

	handleSelectAddress = (e) => {
		this.setState({
			address: e,
		});
	};

	handleDeleteAddress = (e) => {
		var addresses = this.state.addresses;
		var newAddresses = [];
		addresses.forEach((add) => {
			if (add.cname === e.cname && add.address === e.address) {
			} else {
				newAddresses.push(add);
			}
		});
		if (newAddresses.length === 0) {
			this.setState({
				address: {},
				addresses: [],
			});
		} else if (newAddresses.length === 1) {
			this.setState({
				address: newAddresses[0],
			});
		} else {
			this.setState({
				address: newAddresses,
			});
		}
	};

	handleEditAddressShow = (e) => {
		this.setState({
			editAddress: true,
			modal: "modal-address-active",
			city: e.city,
			state: e.state,
			pin: e.pin,
			cname: e.cname,
			cphone: e.cphone,
			add: e.address,
			country: e.country,
			isDefault: e.default,
			ogname: e.cname,
			ogaddress: e.address,
			ogcountry: e.country,
		});
	};

	handleEditAddress = () => {
		var addresses = this.state.addresses;
		addresses.forEach((add) => {
			if (add.cname === this.state.ogname && add.address === this.state.ogaddress) {
				add["cname"] = this.state.cname;
				add["cphone"] = this.state.cphone;
				add["address"] = this.state.add;
				add["pin"] = this.state.pin;
				add["city"] = this.state.city;
				add["state"] = this.state.state;
				add["default"] = this.state.isDefault;
			}
		});
		this.setState({
			modal: "modal-address",
			city: "",
			state: "",
			pin: "",
			cname: "",
			cphone: "",
			add: "",
			ogaddress: "",
			ogname: "",
			country: "",
			addresses: addresses,
		});
	};

	handlePayment = () => {
		if (this.state.address.cname) {
			var subtotal = this.state.rental - (this.state.applyPoints ? this.state.points : 0) - (this.state.coupon.name ? (this.state.coupon.type === "money" ? this.state.coupon.value : Math.round(this.state.rental * (this.state.coupon.value / 100))) : 0);
			if ((subtotal < 499 ? subtotal + (this.state.addressType === "default" ? this.state.shipping : 0) : subtotal) - (this.state.paymentTab === 1 ? this.state.opd : 0) > 0) {
				if (this.state.paymentTab === 1) {
					this.handleRazorPayment();
				}
				if (this.state.paymentTab === 2) {
					this.handleAfterPay("COD");
				}
			}
		} else {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please add a address!",
				confirmButtonColor: "#fb6b25",
			});
		}
	};

	handleRazorPayment = () => {
		this.handleAfterPay();
	};

	handleFormClosed = () => {
		console.log("FormClosed");
		this.setState({
			loadingNext: false,
		});
	};

	handleAfterPay = async () => {
		this.setState({
			loadingNext: true,
		});
		var products = [];
		var oproducts = this.state.products;
		oproducts.forEach((product) => {
			product.rate = false;
			products.push(product);
		});
		Swal.fire({
			icon: "success",
			title: "Cart",
			text: "Order placed successfully",
			confirmButtonColor: "#fb6b25",
		});
		setTimeout(() => {
			localStorage.setItem("cart", JSON.stringify([]));
			this.handleRefresh();
		}, 5000);
	};

	handleApplyCoupon = async () => {
		var coupon = {};
		var coupons = this.state.coupons;
		coupons.forEach((c) => {
			if (c.name.toLowerCase() === this.state.couponCode.toLowerCase() && c.active === "Active") {
				coupon = c;
			}
		});
		var found = false;
		if (coupon.value && found === false) {
			this.setState({
				coupon: coupon,
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Coupon not valid!",
				confirmButtonColor: "#fb6b25",
			});
		}
	};

	handleAddContactInfo = async () => {
		if (this.state.cname === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter a valid name!",
				confirmButtonColor: "#fb6b25",
			});
		} else if (this.state.cphone === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter a valid phone number!",
				confirmButtonColor: "#fb6b25",
			});
		} else if (this.state.cemail === "") {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Please enter a valid email address!",
				confirmButtonColor: "#fb6b25",
			});
		} else {
			this.setState({
				loadingNext: true,
			});
			var otp = "1234";
			this.setState({
				otp: otp,
				showOTP: true,
				loadingNext: false,
			});
		}
	};

	handleVerify = async () => {
		var otp = this.state.c1 + this.state.c2 + this.state.c3 + this.state.c4;
		if (otp === this.state.otp) {
			this.setState(
				{
					modalVerfiy: "modal-verify",
				},
				() => {
					this.handlePayment();
				},
			);
		} else {
			Swal.fire({
				icon: "error",
				title: "Cart",
				text: "Wrong OTP!",
				confirmButtonColor: "#fb6b25",
			});
		}
	};

	handleChangeCode = (e) => {
		var { id, value } = e.target;
		this.setState(
			{
				[id]: value,
			},
			() => {
				console.log(id);
				var num = parseInt(id[1]) + 1;
				var num2 = parseInt(id[1]) - 1;
				var num3 = parseInt(id[1]);
				if (num < 5 && value && num3 !== 4) {
					this["c" + num].current.focus();
				} else if (value === "" && num2 > 0) {
					this["c" + num2].current.focus();
				} else if (num3 === 4) {
					this.handleVerify();
				}
			},
		);
	};

	handleApplyPoints = () => {
		this.setState({
			applyPoints: !this.state.applyPoints,
		});
	};

	render() {
		var inpuCode = [];
		for (var i = 1; i <= 4; i++) {
			inpuCode.push("c" + i);
		}
		var subtotal = this.state.rental - (this.state.applyPoints ? this.state.points : 0) - (this.state.coupon.name ? (this.state.coupon.type === "money" ? this.state.coupon.value : Math.round(this.state.rental * (this.state.coupon.value / 100))) : 0);
		return (
			<>
				{this.state.loading ? (
					<div
						style={{
							width: "100%",
							height: "100vh",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Lottie loop play animationData={loading} style={{ width: 150, height: 150 }} />
					</div>
				) : (
					<>
						{this.state.cart.length === 0 ? (
							<div
								style={{
									width: "100%",
									height: "100vh",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Lottie loop play animationData={empty} style={{ width: 320, height: 320 }} />
								<p
									style={{
										fontSize: "30px",
										color: "#313131",
										marginBottom: "10px",
									}}>
									Your cart is empty
								</p>
								<p
									style={{
										color: "#717171",
										textAlign: "center",
										margin: "0 10px",
										marginBottom: "15px",
									}}>
									Add items in your cart and come back later to process checkout.
								</p>
								<a
									href="/products"
									style={{
										backgroundColor: "#fb6b25",
										textDecoration: "none",
										padding: "0.8rem 1rem",
										color: "#fff",
										borderRadius: "3px",
									}}>
									Continue to shopping
								</a>
							</div>
						) : (
							<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="cart-container">
								<div className="categorylist-breadcrumb">
									<div className="breadcrumb-menu">
										<div className="bd-menu-list">
											<a href="/" style={{ cursor: "pointer" }}>
												Home
											</a>
											<a href="/">
												<i className="fas fa-chevron-right"></i>
											</a>
											<a href={"/cart"} style={{ cursor: "pointer" }}>
												Cart
											</a>
										</div>
									</div>
								</div>
								<div className="cart-section">
									<div className="left">
										<div className="head">
											<div className="head-text">
												<div className="sub">
													<p>Your Cart</p>
													<div className="line"></div>
												</div>

												{this.state.cart.length > 0 ? (
													<div className="item-count">
														<p>
															{this.state.cart.length} {this.state.cart.length === 1 ? "item" : " items"}
														</p>
													</div>
												) : null}
											</div>
											<div className="head-amt"></div>
										</div>

										<div className="body">
											{this.state.cart.map((info, index) => {
												return <CheckOutCard handleDelete={this.handleDelete} info={info} key={index} currentUser={this.state.currentUser} handleRefresh={this.handleRefresh} />;
											})}
										</div>
									</div>

									<div className="right">
										<div className="coupon-box">
											<div className="coupon">
												<input type="text" placeholder="Enter coupon code Free4U" name="couponCode" value={this.state.couponCode} onChange={this.handleChange} />
												{this.state.coupon.value ? (
													<>
														{this.state.coupon.name.toLowerCase() === this.state.couponCode.toLowerCase() ? (
															<button type="button">APPLIED</button>
														) : (
															<button type="button" onClick={this.handleApplyCoupon}>
																APPLY
															</button>
														)}
													</>
												) : (
													<button type="button" onClick={this.handleApplyCoupon}>
														APPLY
													</button>
												)}
											</div>
										</div>
										<div className="process-box">
											<div className="process-header">
												<div className="step">
													{this.state.tab === 1 ? (
														<p
															className="active"
															onClick={() =>
																this.setState({
																	tab: 1,
																	process1: "process1",
																	process2: "process2",
																})
															}>
															CART
														</p>
													) : (
														<>
															{this.state.tab > 1 ? (
																<p
																	className="done"
																	onClick={() =>
																		this.setState({
																			tab: 1,
																			process1: "process1",
																			process2: "process2",
																		})
																	}>
																	CART
																</p>
															) : (
																<p
																	onClick={() =>
																		this.setState({
																			tab: 1,
																		})
																	}>
																	CART
																</p>
															)}
														</>
													)}
												</div>
												<div className={this.state.process1}></div>
												<div className="step">
													{this.state.tab === 2 ? (
														<p
															className="active"
															onClick={() =>
																this.setState({
																	tab: 2,
																	process2: "process2",
																})
															}>
															ADDRESS
														</p>
													) : (
														<>
															{this.state.tab > 2 ? (
																<p
																	className="done"
																	onClick={() =>
																		this.setState({
																			tab: 2,
																			process2: "process2",
																		})
																	}>
																	ADDRESS
																</p>
															) : (
																<p>ADDRESS</p>
															)}
														</>
													)}
												</div>
												<div className={this.state.process2}></div>
												<div className="step">
													{this.state.tab === 3 ? (
														<p
															className="active"
															onClick={() =>
																this.setState({
																	tab: 3,
																})
															}>
															PAYMENT
														</p>
													) : (
														<>
															{this.state.tab > 3 ? (
																<p
																	className="done"
																	onClick={() =>
																		this.setState({
																			tab: 3,
																		})
																	}>
																	PAYMENT
																</p>
															) : (
																<p>PAYMENT</p>
															)}
														</>
													)}
												</div>
											</div>
											<div className="process-body">
												{this.state.tab === 1 ? (
													<div className="section">
														<div className="title">
															<img src={cart} alt="cart-summary" />
															<p>Cart Summary</p>
														</div>
														<div className="body">
															<p>PRICE DETAILS</p>
															<div className="line"></div>
															<div className="rent">
																<p>Total</p>
																<span>+ &#8377; {this.state.rental}</span>
															</div>
															<div className="rent">
																<p>Shipping Fees</p>
																<span>{this.state.shipping > 0 && subtotal < 499 ? "+ ₹ " + this.state.shipping : "Free"}</span>
															</div>
															{this.state.points > 0 ? (
																<div className="rent">
																	<div className="points-container">
																		{this.state.applyPoints ? <i onClick={this.handleApplyPoints} className="fas fa-check-circle"></i> : <i onClick={this.handleApplyPoints} className="far fa-circle"></i>}

																		<p
																			style={{
																				fontSize: this.state.applyPoints ? "14px" : "12px",
																				color: this.state.applyPoints ? "#616161" : "#c5c5c5",
																			}}>
																			Redeem Points
																		</p>
																	</div>

																	<span
																		style={{
																			fontSize: this.state.applyPoints ? "14px" : "12px",
																			color: this.state.applyPoints ? "#616161" : "#c5c5c5",
																		}}>
																		- &#8377; {this.state.points}
																	</span>
																</div>
															) : null}
															{this.state.coupon.value > 0 ? (
																<div className="rent">
																	<p>Coupon</p>
																	<span>- &#8377; {this.state.coupon.name ? (this.state.coupon.type === "money" ? this.state.coupon.value : Math.round(this.state.rental * (this.state.coupon.value / 100))) : 0}</span>
																</div>
															) : null}
															<div className="total">
																<p>Sub Total</p>
																<span>&#8377; {subtotal < 499 ? subtotal + this.state.shipping : subtotal}</span>
															</div>

															<div className="next-button">
																<button
																	type="button"
																	onClick={() =>
																		this.setState({
																			tab: 2,
																			process1: "process1-active",
																		})
																	}>
																	CHOOSE ADDRESS
																</button>
															</div>
														</div>
													</div>
												) : this.state.tab === 2 ? (
													<div className="address-section">
														<div className="title">
															<img src={loc} alt="address-icon" />
															<p>Address Details</p>
															<div className="address-type">
																<h1
																	className={this.state.addressType !== "default" ? null : "active"}
																	onClick={() => {
																		this.setState({
																			addressType: "default",
																		});
																	}}>
																	My Addresses
																</h1>
																<h1
																	className={this.state.addressType !== "store" ? null : "active"}
																	onClick={() => {
																		this.setState({
																			addressType: "store",
																		});
																	}}>
																	Store Pickup
																</h1>
															</div>
														</div>
														<div className="body">
															<div className="address-card-list">
																{this.state.addressType === "default" ? (
																	<>
																		{this.state.addresses.map((add, index) => {
																			return (
																				<div className="address-card" key={index}>
																					<div className="check-address">{this.state.address.cname === add.cname && this.state.address.address === add.address ? <i className="far fa-dot-circle"></i> : <i className="far fa-circle" onClick={() => this.handleSelectAddress(add)}></i>}</div>
																					<div className="address-details">
																						<h1>{add.cname}</h1>
																						<p>{add.address}</p>
																						<p>
																							{add.city} -{add.pin}, {add.state}
																						</p>
																						<p>
																							Mobile : <span>{add.cphone}</span>
																						</p>
																					</div>
																					<div className="address-actions">
																						<i className="far fa-edit" onClick={() => this.handleEditAddressShow(add)}></i>
																						<i className="far fa-trash-alt" onClick={() => this.handleDeleteAddress(add)}></i>
																					</div>
																				</div>
																			);
																		})}
																	</>
																) : (
																	<>
																		{this.state.saddresses.map((add, index) => {
																			return (
																				<div className="address-card" key={index}>
																					<div className="check-address">{this.state.address.cname === add.cname && this.state.address.address === add.address ? <i className="far fa-dot-circle"></i> : <i className="far fa-circle" onClick={() => this.handleSelectAddress(add)}></i>}</div>
																					<div className="address-details">
																						<h1>{add.cname}</h1>
																						<p>{add.address}</p>
																						<p>
																							{add.city} -{add.pin}, {add.state}
																						</p>
																						<p>
																							Mobile : <span>{add.cphone}</span>
																						</p>
																					</div>
																				</div>
																			);
																		})}
																	</>
																)}
															</div>
															{this.state.addresses.length < 5 && this.state.addressType === "default" ? (
																<div className="add-address">
																	<div
																		className="add-box"
																		onClick={() =>
																			this.setState({
																				modal: "modal-address-active",
																			})
																		}>
																		<p>+ Add New Address</p>
																	</div>
																</div>
															) : null}
															<div className="next-back-button">
																<button
																	type="button"
																	onClick={() =>
																		this.setState({
																			tab: 3,
																			process2: "process2-active",
																		})
																	}>
																	PROCEED TO PAYMENT
																</button>
															</div>
														</div>
													</div>
												) : (
													<div className="payment-section">
														<div className="title">
															<img src={pay} alt="payemnt-logo" />
															<p>Choose Payment</p>
														</div>
														<div className="body">
															<div
																className="pay"
																onClick={() =>
																	this.setState({
																		paymentTab: 1,
																	})
																}>
																{this.state.paymentTab === 1 ? <i className="far fa-dot-circle active"></i> : <i className="far fa-circle"></i>}
																<img src={razorpay} alt="razorpay-logo" />
																<p>Pay via razorpay &#8377; {this.state.opd} off</p>
															</div>
															{this.state.cod ? (
																<div
																	className="pay"
																	onClick={() =>
																		this.setState({
																			paymentTab: 2,
																		})
																	}>
																	{this.state.paymentTab === 2 ? <i className="far fa-dot-circle active"></i> : <i className="far fa-circle"></i>}
																	<img src={cod} alt="razorpay-logo" />
																	<p>Pay on delivery</p>
																</div>
															) : null}
															{this.state.loadingNext ? (
																<Lottie loop play animationData={loading} style={{ width: 50, height: 50 }} />
															) : (
																<div
																	className="final-button"
																	onClick={() => {
																		if (this.state.paymentTab === 1 && this.state.addressType === "default") {
																			this.handlePayment();
																		} else {
																			this.setState({
																				modalVerfiy: "modal-verify-active",
																				showOTP: false,
																			});
																		}
																	}}>
																	<button type="button">ORDER FOR &#8377; {(subtotal < 499 ? subtotal + (this.state.addressType === "default" ? this.state.shipping : 0) : subtotal) - (this.state.paymentTab === 1 ? this.state.opd : 0)}</button>
																</div>
															)}
														</div>
													</div>
												)}
											</div>
											.
										</div>
									</div>

									{/* verify */}

									<div className={this.state.modalVerfiy}>
										<div className="modal-content">
											<div className="modal-header">
												<p>Verify Order</p>
												<div
													className="modal-address-close-button"
													onClick={() =>
														this.setState({
															modalVerfiy: "modal-verify",
															loadingNext: false,
														})
													}>
													<i className="far fa-times-circle"></i>
												</div>
											</div>
											<div className="modal-body">
												<div className="modal-contact-details">
													{this.state.showOTP === false ? (
														<>
															<p>CONTACT DETAILS</p>
															<input className="contact-input" type="text" placeholder="Name" name="cname" onChange={this.handleChange} value={this.state.cname} />
															<PhoneInput
																country={"in"}
																onlyCountries={["in"]}
																disableDropdown={true}
																disableCountryCode={true}
																value={this.state.cphone}
																onChange={(cphone) =>
																	this.setState({
																		cphone,
																	})
																}
																placeholder="Enter your phone number"
															/>
															<input className="contact-input" type="text" placeholder="Email Address" name="cemail" onChange={this.handleChange} value={this.state.cemail} />
														</>
													) : (
														<>
															<p>Enter 4 digit verification code</p>
															<div className="verification-cont">
																<div className="code-container">
																	{inpuCode.map((item, index) => {
																		return (
																			<div className="code-verification" key={index}>
																				<input placeholder={index + 1} maxLength={1} id={item} type="text" value={this.state[item]} onChange={this.handleChangeCode} name={item} ref={this[item]} />
																			</div>
																		);
																	})}
																</div>
															</div>
														</>
													)}
												</div>
											</div>
											<div className="modal-footer">
												{this.state.showOTP ? (
													<>
														{this.state.loadingNext ? (
															<Lottie loop play animationData={loading} style={{ width: 50, height: 50 }} />
														) : (
															<button type="button" onClick={this.handleVerify}>
																ORDER
															</button>
														)}
													</>
												) : (
													<>
														{this.state.loadingNext ? (
															<Lottie loop play animationData={loading} style={{ width: 50, height: 50 }} />
														) : (
															<button type="button" onClick={this.handleAddContactInfo}>
																VERIFY DETAILS
															</button>
														)}
													</>
												)}
											</div>
										</div>
									</div>

									{/* Add address modal */}
									<div className={this.state.modal}>
										<div className="modal-content">
											<div className="modal-header">
												<p>ADD NEW ADDRESS</p>
												<div
													className="modal-address-close-button"
													onClick={() =>
														this.setState({
															modal: "modal-address",
														})
													}>
													<i className="far fa-times-circle"></i>
												</div>
											</div>
											<div className="modal-body">
												<div className="modal-contact-details">
													<p>CONTACT DETAILS</p>
													<input type="text" placeholder="Name" name="cname" onChange={this.handleChange} value={this.state.cname} />
													<input type="text" placeholder="Mobile Number" name="cphone" onChange={this.handleChange} value={this.state.cphone} />
												</div>
												<div className="modal-address-details">
													<p>ADDRESS DETAILS</p>
													<input type="text" placeholder="Address (House No., building, street, area)" name="add" onChange={this.handleChange} value={this.state.add} />
													<input type="text" placeholder="Pincode" name="pin" onChange={this.handleChange} value={this.state.pin} />
													<input type="text" placeholder="City" name="city" onChange={this.handleChange} value={this.state.city} />
													<input type="text" placeholder="State" name="state" onChange={this.handleChange} value={this.state.state} />
													<input type="text" placeholder="Country" name="country" onChange={this.handleChange} value={this.state.country} />
													<input type="text" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email} />
												</div>
											</div>
											<div className="modal-footer">
												{this.state.editAddress ? (
													<button type="button" onClick={this.handleEditAddress}>
														UPDATE ADDRESS
													</button>
												) : (
													<button type="button" onClick={this.handleSubmit}>
														ADD ADDRESS
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</>
				)}
			</>
		);
	}
}

export default Cart;
