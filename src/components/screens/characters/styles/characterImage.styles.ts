import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	card: {
		width: 100,
		borderRadius: 14,
		overflow: "hidden",
		backgroundColor: "#1E293B",
	},

	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.98 }],
	},

	imageWrapper: {
		width: "100%",
		aspectRatio: 0.5,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0F172A",
	},

	image: {
		width: "100%",
		height: "100%",
		borderWidth: 1,
		borderRadius: 14,
		borderColor: "#E0E0E0", // subtle visible border
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
		backgroundColor: "#334155",
	},

	unavailableText: {
		color: "#CBD5E1",
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
		fontSize: 12,
		textAlign: "center",
	},
});

export default styles;
