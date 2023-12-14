import React from "react";
import { Card as MaterialCard, Typography, CardMedia, CardContent, CardActionArea } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/system";

const Card = ({ item }) => {
	const percent = Math.round((item.sp / item.cp) * 100);

	return (
		<MaterialCard sx={{ width: { xs: window.screen.width / 2 - 20 > 220 ? 220 : window.screen.width / 2 - 20, sm: 180, md: 200 }, m: 1, position: "relative" }} variant="outlined">
			<CardActionArea component={RouterLink} to={`/product/${item.id}`} sx={{ pt: 2 }}>
				{item.quantity === 0 ? (
					<Box
						position="absolute"
						top={0}
						left={0}
						bgcolor="background.overlay"
						sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2, width: "100%", height: "100%" }}>
						<Typography variant="outStock" color="text.red">
							OUT OF STOCK
						</Typography>
					</Box>
				) : null}
				<CardMedia component="img" height="120" image={item.thumbnail} alt="product" sx={{ objectFit: "contain", mb: 1, px: 2 }} />
				<CardContent style={{ display: "flex", flexDirection: "column" }}>
					<Typography variant="small" color="text.black" sx={{ mb: 1, display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>
						{item.title}
						{window.screen.width}
					</Typography>
					<Typography variant="small" color="text.black" sx={{ mb: 1 }}>
						₹{item.sp}
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "row" }}>
						<Typography variant="strikeOutSmall" color="text.grey" sx={{ mr: 1.1 }}>
							₹{item.cp}
						</Typography>
						<Typography variant="small" color="text.primary">
							{100 - percent}% off
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</MaterialCard>
	);
};

export default Card;
