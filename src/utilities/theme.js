import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		background: {
			primary: "#fb6b25",
			paper: "#fff",
			lightGrey: "#f7f7f7",
			overlay: "rgba(110,110,110,0.1)",
		},
		primary: {
			main: "#fb6b25",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
		text: {
			primary: "#fb6b25",
			black: "#000",
			grey: "#808080",
			red: red.A400,
		},
	},
	typography: {
		xsmall: {
			fontFamily: "Mulish",
			fontWeight: 400,
			fontSize: "0.8rem",
		},
		small: {
			fontFamily: "Mulish",
			fontWeight: 400,
			fontSize: "0.9rem",
		},
		bold: {
			fontFamily: "Mulish",
			fontWeight: 700,
			fontSize: "1rem",
		},
		strikeOutSmall: {
			fontFamily: "Mulish",
			fontWeight: 400,
			fontSize: "1rem",
			textDecoration: "line-through",
		},
		outStock: {
			fontFamily: "Mulish",
			fontWeight: 600,
			fontSize: "1rem",
		},
	},
});

export default theme;
