import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	tipText: {
		fontSize: 12,
		color: "#1E293B", // dark tip text for light background
		marginBottom: 8,
		textAlign: "center",
	},
	container: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 16,
		alignItems: "center",
	},

	card: {
		borderRadius: 14,
		backgroundColor: "#1E293B",
		padding: 12,
		justifyContent: "center",
		alignItems: "center",
	},

	image: {
		width: "100%",
		aspectRatio: 1,
		borderRadius: 10,
	},

	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.9)",
		justifyContent: "center",
		alignItems: "center",
	},

	modalImage: {
		width: "90%",
		height: "80%",
		borderRadius: 12,
	},
});

export default styles;
