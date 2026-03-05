import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	loader: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
	},

	unavailable: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#334155",
	},

	unavailableText: {
		color: "#CBD5E1",
		fontSize: 10,
		textAlign: "center",
		paddingHorizontal: 2,
	},
});

export default styles;
