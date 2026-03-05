import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#1E293B",
		borderRadius: 12,
		overflow: "hidden",
	},

	unavailable: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#334155",
		borderRadius: 12,
	},

	unavailableText: {
		color: "#F1F5F9",
		fontWeight: "600",
		fontSize: 14,
		textAlign: "center",
	},
});

export default styles;
