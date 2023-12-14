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
import { Breadcrumbs, Typography, Grid, Button, Dialog, AppBar, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

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
			minLimit: 0,
			maxLimit: 0,
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
				maxLimit: max,
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
			min: 0,
			max: this.state.maxLimit,
			presentColor: "All",
			category: "All",
			subcategory: "All",
			sortType: "Relevance",
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
		var newList = filteredList(this.state.productList, {
			color: this.state.presentColor,
			min: this.state.min,
			max: this.state.max,
			sort: this.state.sortType,
			category: this.state.category,
			subCategory: this.state.subcategory,
			stock: this.state.outStock,
			emboss: this.state.emboss,
		});
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
						<Box bgcolor="background.lightGrey" width="100%" px={{ xs: 2, sm: 6 }} py={2} display="flex" justifyContent="space-between" alignItems="center">
							<Breadcrumbs separator="›" aria-label="product-list-breadcrumb">
								<Link to="/">
									<Typography color="text.grey">Home</Typography>
								</Link>
								<Typography color="text.primary">Products</Typography>
							</Breadcrumbs>
							<Typography variant="small">We have {(this.state?.filterProductList || []).length} product(s)</Typography>
						</Box>
						<Box sx={{ width: "100%", maxWidth: "1700px", display: "flex" }}>
							<Box display={{ xs: "none", md: "block" }} sx={{ px: 3 }} width={300}>
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
							</Box>
							<Box width={{ xs: "100%", md: "calc(100% - 300px)" }} py={1}>
								{this.state.productLoading ? (
									<Box width="100%" height="90vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
										<Lottie loop play animationData={circular} style={{ width: 100, height: 100 }} />
									</Box>
								) : (
									<Grid container>
										{(this.state?.filterProductList || []).map((item, index) => {
											return (
												<Grid item key={index} xs={6} sm={4} md={4} lg={3} xl={2}>
													<Card item={item} addToWishlist={(e) => this.addToWishlist(e)} removeFromWishlist={(e) => this.removeFromWishlist(e)} />
												</Grid>
											);
										})}
									</Grid>
								)}
								{!(this.state?.filterProductList || []).length && (
									<Box width="100%" height="70vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
										<Lottie loop play animationData={empty} style={{ width: 200, height: 200 }} />
										<Typography variant="bold">Sorry! we could not find any items</Typography>
									</Box>
								)}
							</Box>
						</Box>
						<Button
							endIcon={<FilterAltIcon />}
							size="large"
							variant="contained"
							sx={{ display: { sm: "block", md: "none" }, bgcolor: "#000", position: "sticky", bottom: 30, borderRadius: 8, color: "#fff" }}
							onClick={() => this.setState({ showFilter: true })}>
							Filters
						</Button>
						<Dialog fullScreen open={this.state.showFilter} onClose={() => this.setState({ showFilter: false })}>
							<AppBar sx={{ position: "relative" }}>
								<Toolbar>
									<IconButton edge="start" color="inherit" onClick={() => this.setState({ showFilter: false })} aria-label="close">
										<CloseIcon />
									</IconButton>
									<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
									<Button autoFocus color="inherit" onClick={() => this.setState({ showFilter: false })}>
										Done
									</Button>
								</Toolbar>
							</AppBar>
							<Box px={2}>
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
							</Box>
						</Dialog>
					</motion.div>
				)}
			</>
		);
	}
}

export default ProductList;
