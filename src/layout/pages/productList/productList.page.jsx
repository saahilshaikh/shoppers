import React from "react";
import { motion } from "framer-motion";
import "./productList.style.css";
import Filter from "../../components/filter/filter.component";
import Card from "../../components/card/card.component";
import Lottie from "react-lottie-player";
import empty from "../../../assets/json/empty.json";
import circular from "../../../assets/json/circular-loading.json";
import Loader from "../../components/loader/loader.component";
import { categoriesData, productData } from "../../../utilities/productData";
import { filteredList } from "../../../utilities";
import Modal from "react-modal";

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

class ProductList extends React.Component {
	constructor() {
		super();
		this.state = {
			productList: [],
			categories: [],
			filterProductList: [],
			type: [],
			outStock: true,
			loading: true,
			min: 0,
			max: 0,
			showFilter: false,
			productLoading: false,
			colors: [],
			presentColor: "All",
			subcategory: "All",
			category: "All",
			sortType: "Relevance",
			emboss: false,
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.handleInit();
	}

	handleInit = () => {
		var products = [],
			colors = [],
			min = 0,
			max = 100;
		Object.keys(productData).forEach((key) => {
			var product = { ...productData[key], id: key };
			if (product.sale) {
				product.sp = product.special;
			}
			if (!colors.includes(product.color.toLowerCase())) {
				colors.push(product.color.toLowerCase());
			}
			if (min > product.sp) {
				min = product.sp;
			}
			if (max < product.sp) {
				max = product.sp;
			}
			products.push(product);
		});
		this.setState(
			{
				productList: products,
				filterProductList: products,
				colors: colors,
				min: min,
				max: max,
				categories: categoriesData,
				loading: false,
			},
			() => {
				this.handleFilterIt();
			},
		);
	};

	handleRentRange = (min, max) => {
		this.setState(
			{
				min,
				max,
			},
			() => {
				this.handleFilterIt();
			},
		);
	};

	handleReset = () => {
		this.setState({
			filterProductList: this.state.productList,
			outStock: true,
			type: [],
			min: 100,
			max: 5000,
			presentColor: "All",
			category: "All",
			subcategory: "All",
		});
	};

	handleCategory = (e) => {
		this.setState(
			{
				category: e,
				subcategory: "All",
			},
			() => {
				this.handleFilterIt();
			},
		);
	};

	handleFilterIt = () => {
		var newList = filteredList(this.state.productList, { color: this.state.presentColor, min: this.state.min, max: this.state.max, sort: this.state.sortType, category: this.state.category?.name || this.state.category, subCategory: this.state.subcategory?.name || this.state.subcategory, stock: this.state.outStock, emboss: this.state.emboss });
		this.setState({
			filterProductList: newList,
		});
	};

	handleFilter = (target, value) => {
		this.setState(
			{
				[target]: value,
			},
			() => {
				this.handleFilterIt();
			},
		);
	};

	render() {
		return (
			<>
				{this.state.loading ? (
					<Loader />
				) : (
					<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="productlist-container">
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
										Products
									</a>
								</div>

								<div className="bd-menu-stats">
									<p>We have total {this.state.filterProductList.length > 1 ? this.state.filterProductList.length + " products" : this.state.filterProductList.length + " product"}</p>
								</div>
							</div>
						</div>
						<div className="catalogue">
							<div className="filter">
								<Filter
									categories={this.state.categories}
									colors={this.state.colors}
									sortType={this.state.sortType}
									category={this.state.category}
									subcategory={this.state.subcategory}
									min={this.state.min}
									max={this.state.max}
									presentColor={this.state.presentColor}
									emboss={this.state.emboss}
									outStock={this.state.outStock}
									handleColorFilter={(value) => this.handleFilter("presentColor", value)}
									handleCategory={this.handleCategory}
									handleSubCategory={(value) => this.handleFilter("subcategory", value)}
									handleReset={this.handleReset}
									handleSort={(value) => this.handleFilter("sortType", value)}
									handleProductEmboss={(value) => this.handleFilter("emboss", !this.state.emboss)}
									handleRentRange={(min, max) => this.handleRentRange(min, max)}
									handleProductOutStock={(value) => this.handleFilter("outStock", !this.state.outStock)}
								/>
							</div>

							<div className="card-list-container">
								{this.state.productLoading ? (
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											width: "100%",
											height: "100%",
										}}>
										<Lottie loop play animationData={circular} style={{ width: 100, height: 100 }} />
									</div>
								) : (
									<div className="card-list">
										{this.state.filterProductList.length > 0 ? (
											<>
												{this.state.filterProductList.map((item, index) => {
													return <Card item={item} addToWishlist={(e) => this.addToWishlist(e)} removeFromWishlist={(e) => this.removeFromWishlist(e)} key={index} />;
												})}
											</>
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
								)}
							</div>
						</div>
						<div className="filter-mob-button-container">
							<button onClick={() => this.setState({ showFilter: true })}>filter</button>
						</div>
						<Modal isOpen={this.state.showFilter} onRequestClose={() => this.setState({ showFilter: false })} contentLabel="Filter Modal">
							<div className="mobile-filter-container">
								<Filter
									categories={this.state.categories}
									colors={this.state.colors}
									sortType={this.state.sortType}
									category={this.state.category}
									subcategory={this.state.subcategory}
									min={this.state.min}
									max={this.state.max}
									presentColor={this.state.presentColor}
									emboss={this.state.emboss}
									outStock={this.state.outStock}
									handleColorFilter={(value) => this.handleFilter("presentColor", value)}
									handleCategory={this.handleCategory}
									handleSubCategory={(value) => this.handleFilter("subcategory", value)}
									handleReset={this.handleReset}
									handleSort={(value) => this.handleFilter("sortType", value)}
									handleProductEmboss={(value) => this.handleFilter("emboss", !this.state.emboss)}
									handleRentRange={(min, max) => this.handleRentRange(min, max)}
									handleProductOutStock={(value) => this.handleFilter("outStock", !this.state.outStock)}
								/>
							</div>
						</Modal>
					</motion.div>
				)}
			</>
		);
	}
}

export default ProductList;
