import React from "react";
import "./card.style.css";
import Lottie from "react-lottie-player";
import Loading from "../../../assets/json/loading.json";

export default class Card extends React.Component {
	constructor(props) {
		super(props);
		props = {
			item: [],
			loading: true,
			isWished: false,
			currentUser: "",
			orderDetail: false,
		};
	}

	addToWishlist = () => {
		// 	firebase
		// 		.firestore()
		// 		.collection("users")
		// 		.where("uid", "==", firebase.auth().currentUser.uid)
		// 		.get()
		// 		.then((snap) => {
		// 			snap.forEach((doc) => {
		// 				var wishlist = doc.data().wishlist;
		// 				var found = false;
		// 				wishlist.forEach((item) => {
		// 					if (item === this.props.item.id) {
		// 						found = true;
		// 					}
		// 				});
		// 				if (found === false) {
		// 					this.setState({
		// 						isWished: true,
		// 					});
		// 					wishlist.push(this.props.item.id);
		// 					firebase
		// 						.firestore()
		// 						.collection("users")
		// 						.doc(doc.id)
		// 						.update({
		// 							wishlist: wishlist,
		// 						})
		// 						.then(() => {
		// 							toaster.notify("Added to your wishlist");
		// 						});
		// 				} else {
		// 					toaster.notify("Item already exists in your wishlist");
		// 				}
		// 			});
		// 		});
	};

	removeFromWishlist = () => {
		// 	firebase
		// 		.firestore()
		// 		.collection("users")
		// 		.where("uid", "==", firebase.auth().currentUser.uid)
		// 		.get()
		// 		.then((snap) => {
		// 			snap.forEach((doc) => {
		// 				var wishlist = doc.data().wishlist;
		// 				if (wishlist.length > 0) {
		// 					var newwishlist = [];
		// 					wishlist.map((item) => {
		// 						if (item !== this.props.item.id) {
		// 							newwishlist.push(item);
		// 						}
		// 					});
		// 					firebase
		// 						.firestore()
		// 						.collection("users")
		// 						.doc(doc.id)
		// 						.update({
		// 							wishlist: newwishlist,
		// 						})
		// 						.then(() => {
		// 							toaster.notify(" Item removed from your wishlist");
		// 							this.setState({
		// 								isWished: false,
		// 							});
		// 						});
		// 				}
		// 			});
		// 		});
	};

	render() {
		var percent = Math.round((this.props.item.sp / this.props.item.cp) * 100);
		return (
			<>
				{this.props.item.title ? (
					<div className={this.props.item.quantity > 0 ? "card-cont" : "card-cont grey"} onClick={this.props.item.quantity > 0 ? null : () => (window.location.href = "/product/" + this.props.item.id)}>
						{!this.props.item.quantity > 0 ? <p className="outOfStock">OUT OF STOCK</p> : null}
						{this.props.loading ? (
							<Lottie loop play animationData={Loading} style={{ width: 100, height: 100 }} />
						) : (
							<>
								<div className="img-container">
									<a style={{ width: "100%", height: "100%" }} href={"/product/" + this.props.item.id}>
										<img src={this.props.item.thumbnail} alt="Bag-Icon" />
									</a>
								</div>
								{this.props.currentUser && this.props.currentUser.email ? (
									<>
										{this.props.isWished ? (
											<div className="circle" onClick={() => this.removeFromWishlist(this.props.item.id)}>
												<i className="red fa fa-heart"></i>
											</div>
										) : (
											<div className="circle" onClick={() => this.addToWishlist(this.props.item.id)}>
												<i className="fa fa-heart"></i>
											</div>
										)}
									</>
								) : null}

								<a href={"/product/" + this.props.item.id} className="short-description">
									<p className="item-title">{this.props.item.title}</p>
									<p className="item-price">&#8377;{this.props.item.sp}</p>
									<div className="price-flex">
										<p className="price-line-through">&#8377;{this.props.item.cp}</p>
										<p className="discount">{100 - percent}% off</p>
									</div>
								</a>
							</>
						)}
					</div>
				) : null}
			</>
		);
	}
}
