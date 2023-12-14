import React from "react";
import "./filter.style.css";
import "rc-slider/assets/index.css";
import filter from "./assets/filter.png";
import { Box } from "@mui/system";
import { Button, Typography, Checkbox, Slider, Container } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
export default class Filter extends React.Component {
	constructor() {
		super();
		this.state = {
			value: 3,
			type: [],
			minPrice: 0,
			maxPrice: 0,
			maxLimit: 0,
			minLimit: 0,
			loading: true,
		};
	}

	componentDidMount() {
		this.setState({
			minPrice: this.props.min,
			maxPrice: this.props.max,
			minLimit: this.props.min,
			maxLimit: this.props.max,
			loading: false,
		});
	}

	handleSlider = (value) => {
		this.setState(
			{
				value,
			},
			() => {
				this.props.handleMonths(value);
			},
		);
	};

	handleRange = (e) => {
		if (e[0] !== e[1]) {
			this.setState(
				{
					minPrice: e[0],
					maxPrice: e[1],
				},
				() => {
					this.props.handleRentRange(e[0], e[1]);
				},
			);
		}
	};

	handleReset = () => {
		this.setState(
			{
				minPrice: this.state.minLimit,
				maxPrice: this.state.maxLimit,
			},
			() => {
				this.props.handleReset();
			},
		);
	};

	render() {
		let categoryOptions = [{ name: "All", value: "All" }];
		let subCategoryOptions = [{ name: "All", value: "All" }];
		let colorOptions = [{ name: "All", value: "All" }];
		(this.props?.categories || []).map((category) => {
			categoryOptions.push({ name: category.name, value: category.name });
			if (category.name === this.props.category) {
				category.subcategories.map((subCategory) => {
					subCategoryOptions.push({ name: subCategory.name, value: subCategory.name });
				});
			}
		});
		(this.props?.colors || []).map((color) => {
			colorOptions.push({ name: color, value: color });
		});

		let information = [
			{
				type: "checkbox",
				title: "Sort by",
				options: [
					{ name: "Relevance", value: "Relevance" },
					{ name: "Price- Low to High", value: "lth" },
					{ name: "Price- High to Low", value: "htl" },
				],
				variableName: "sortType",
				function: (value) => this.props.handleSort(value),
			},
			{
				type: "checkbox",
				title: "Categories",
				options: categoryOptions,
				variableName: "category",
				function: (value) => this.props.handleCategory(value),
			},
			{
				type: "checkbox",
				title: "Sub Categories",
				options: subCategoryOptions,
				variableName: "subcategory",
				function: (value) => this.props.handleSubCategory(value),
			},
			{
				type: "range",
				title: "Price",
				variableNames: ["min", "max"],
				function: (value) => this.handleRange(value),
			},
			{
				type: "checkbox",
				title: "Colors",
				options: colorOptions,
				variableName: "presentColor",
				function: (value) => this.props.handleColorFilter(value),
			},
			{
				type: "checkbox",
				title: "Availability",
				options: [{ name: "Out of Stock", value: "true" }],
				variableName: "outStock",
				function: (value) => this.props.handleProductOutStock(value),
			},
		];

		return (
			<Box width="100%" py={2}>
				<Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
					<Typography variant="small" fontSize={16} sx={{ ml: 0.4 }}>
						Filters
					</Typography>
					<Button onClick={this.handleReset} variant="text" size="small" color="primary">
						Clear all
					</Button>
				</Box>
				{information.map((information, index) => {
					if (information.title == "Sub Categories" && this.props.category === "All") {
						return null;
					} else {
						return (
							<Box width="100%" padding={2} my={1} key={index} sx={{ border: "1px solid #e7e7e7", borderRadius: 1 }}>
								<Typography color="#000" variant="small">
									{(information?.title || "").toUpperCase()}
								</Typography>
								{information.type === "checkbox" &&
									(information?.options || []).map((option, optionIndex) => {
										let value = this.props[information.variableName] || "";
										return (
											<Box width="100%" display="flex" alignItems="center" key={optionIndex}>
												<Checkbox
													onClick={() => information.function(option?.value || "")}
													color="primary"
													size="small"
													checked={value.toString().toLowerCase() === (option?.value || "").toString().toLowerCase()}
													sx={{ py: 0.5 }}
												/>
												<Typography color="#000" variant="small" sx={{ textTransform: "capitalize" }}>
													{option?.name || ""}
												</Typography>
											</Box>
										);
									})}
								{information.type === "range" && (
									<Box width="100%" p={1}>
										<Typography color="#000" variant="small">
											&#8377;{this.state.minPrice} - &#8377;{this.state.maxPrice}
										</Typography>
										<Slider
											value={[this.props[information.variableNames[0]], this.props[information.variableNames[1]]]}
											onChange={(e, value) => this.handleRange(value)}
											min={this.state.minLimit}
											max={this.state.maxLimit}
											valueLabelDisplay="auto"
										/>
									</Box>
								)}
							</Box>
						);
					}
				})}
			</Box>
		);
	}
}
