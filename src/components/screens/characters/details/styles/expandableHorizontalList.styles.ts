import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	tipText: {
		fontSize: 12,
		color: "#94A3B8",
		marginBottom: 8,
		textAlign: "center",
	},
	listContainer: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		gap: 16,
		alignItems: "center",
	},

	card: {
		borderRadius: 14,
		backgroundColor: "#1E293B",
		paddingVertical: 14,
		paddingHorizontal: 12,
		alignItems: "center",
		gap: 10,
	},

	imageWrapper: {
		backgroundColor: "#0F172A",
		borderRadius: 10,
		padding: 6,
	},

	name: {
		fontSize: 15,
		fontWeight: "600",
		color: "#FFFFFF",
		textAlign: "center",
	},

	pressed: {
		opacity: 0.85,
		transform: [{ scale: 0.97 }],
	},

	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.9)",
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},

	modalCard: {
		borderRadius: 14,
		backgroundColor: "#1E293B",
		padding: 20,
		alignItems: "center",
	},

	modalImage: {
		width: "50%",
		aspectRatio: 1,
		borderRadius: 12,
		marginBottom: 16,
	},

	modalName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFFFFF",
		textAlign: "center",
		marginBottom: 8,
	},

	modalDescription: {
		fontSize: 14,
		color: "#CBD5F5",
		textAlign: "center",
	},
});

export default styles;
