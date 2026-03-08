import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	card: {
		width: 100,
		borderRadius: 14,
		overflow: "hidden",
		backgroundColor: "#F8FAFC",
	},

	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.98 }],
	},

	imageWrapper: {
		width: "100%",
		aspectRatio: 0.5,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#E6ECF3", // soft light border
		borderRadius: 14, // match card radius
	},

	image: {
		width: "100%",
		height: "100%",
	},

	loaderOverlay: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
	},

	unavailable: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E6ECF3",
	},

	unavailableText: {
		color: "#64748B",
		fontSize: 12,
		textAlign: "center",
	},

	errorContainer: {
		width: 100,
		height: 200,
		justifyContent: "center",
		alignItems: "center",
	},

	errorText: {
		color: "#475569",
		fontSize: 12,
		textAlign: "center",
	},
});

export default styles;
