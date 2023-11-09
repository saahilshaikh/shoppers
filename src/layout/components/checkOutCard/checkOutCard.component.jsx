import React from "react";
import truck from "./truck.svg";
import "./checkOutCard.style.css";
import { productData } from "../../../utilities/productData";
import Swal from "sweetalert2";

export default class CheckOutCard extends React.Component {
	constructor() {
		super();
		this.state = {
			productInfo: {},
			quantity: 0,
		};
	}

	componentDidMount() {
		let productInfo = productData[this.props.info.id];
		productInfo.id = this.props.info.id;
		if (productInfo.sale) {
			productInfo.sp = productInfo.special;
		}
		if (productInfo.quantity > 0) {
			if (this.props.info.size === "null") {
				if (productInfo.quantity >= this.props.info.byeQuantity && productInfo.max >= this.props.info.byeQuantity) {
					this.setState({
						productInfo: productInfo,
						quantity: this.props.info.byeQuantity,
					});
				} else {
					this.setState(
						{
							NF: true,
							quantity: 1,
						},
						() => {
							this.handleRemove();
						},
					);
				}
			} else {
				productInfo.sizes.forEach((size) => {
					if (size.name === this.props.info.size) {
						if (size.quantity >= this.props.info.byeQuantity && productInfo.max >= this.props.info.byeQuantity) {
							this.setState({
								productInfo: productInfo,
								quantity: this.props.info.byeQuantity,
							});
						} else {
							this.setState(
								{
									NF: true,
									quantity: 1,
								},
								() => {
									this.handleRemove();
								},
							);
						}
					}
				});
			}
		} else {
			this.setState(
				{
					NF: true,
					quantity: 1,
				},
				() => {
					this.handleRemove();
				},
			);
		}
	}

	handleRemove = async () => {
		let q = this.state.quantity - 1;
		if (q >= 0) {
			let data = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
			let newCart = [];
			if (q !== 0) {
				newCart = data;
				newCart.forEach((c) => {
					if (c.id === this.props.info.id) {
						c.quantity = q;
					}
				});
			} else {
				data.forEach((c) => {
					if (c.id !== this.props.info.id) {
						newCart.push(c);
					}
				});
			}
			localStorage.setItem("cart", JSON.stringify(newCart));
			this.setState(
				{
					quantity: q,
				},
				() => {
					if (this.state.quantity === 0) {
						this.setState(
							{
								NF: true,
							},
							() => {
								this.props.handleRefresh();
							},
						);
					}
				},
			);
		}
	};

	handleAdd = () => {
		let q = this.state.quantity + 1;
		let product = { ...productData[this.props.info.id] };
		product.id = this.props.info.id;
		console.log(product);
		if (this.props.info.size === "null") {
			if (product.quantity >= q && product.max >= q) {
				let data = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];
				data.forEach((c) => {
					if (c.id === this.props.info.id) {
						c.byeQuantity = q;
					}
				});
				localStorage.setItem("cart", JSON.stringify(data));
				this.setState(
					{
						quantity: q,
					},
					() => {
						// this.props.handleRefresh();
					},
				);
			} else {
				Swal.fire({
					icon: "error",
					title: "Cart",
					text: "You cannot add more quanity!",
					confirmButtonColor: "#fb6b25",
				});
			}
		}
	};

	render() {
		return (
			<>
				{this.state.NF ? null : (
					<div className="prod-card">
						<div className="card-content">
							<div className="left-img">
								<a href={"/product/" + this.state.productInfo.id}>
									<img src={this.state.productInfo.thumbnail} alt="prod-img" />
								</a>
							</div>
							<div className="right-details">
								<div className="item-name">
									<a href={"/product/" + this.state.productInfo.id}>
										<p>
											{this.state.productInfo.title}
											<br />
											{this.props.info.emboss ? " (with emboss: " + this.props.info.embossText + ")" : null}
										</p>
									</a>
									<div className="delete" onClick={() => this.props.handleDelete(this.props.info)}>
										<i className="fas fa-trash"></i>
										<p>Remove</p>
									</div>
								</div>
								<div className="item-price-time">
									<div className="tenure">
										<p>&#8377; {this.state.productInfo.sp + (this.props.info.emboss ? this.state.productInfo.embossprice : 0)}</p>
										<span>
											<span style={{ textDecoration: "line-through", marginRight: "2px" }}>&#8377; {this.state.productInfo.cp}</span>
											<span style={{ color: "#fb6b25" }}>{100 - Math.round((this.state.productInfo.sp / this.state.productInfo.cp) * 100)}% off</span>
										</span>
									</div>
									{this.props.info.size !== "null" ? (
										<div className="tenure">
											<p style={{ textTransform: "uppercase" }}>{this.props.info.size}</p>
											<span>Size</span>
										</div>
									) : null}
									<div className="tenure">
										<p>
											<button onClick={this.handleRemove} className="qbtn">
												<p>-</p>
											</button>
											{this.state.quantity}
											<button onClick={this.handleAdd} className="qbtn">
												<p>+</p>
											</button>
										</p>
										<span>Quantity</span>
									</div>
									<div className="tenure">
										<p>{this.state.productInfo.replacementlimit > 0 ? this.state.productInfo.replacementlimit + " Days" : "No"} Replacement Policy available</p>
									</div>
								</div>
								<div className="item-delivery">
									<img src={truck} alt="truck" />
									<p>Delivery Charge :</p>
									<p>{this.state.productInfo.shippingCharge !== 0 ? "₹ " + this.state.productInfo.shippingCharge : "Free"}</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}
