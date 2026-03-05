import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	tipText: {
		fontSize: 12,
		color: "#1E293B",
		marginBottom: 8,
		textAlign: "center",
	},
	listContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
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

	badge: {
		position: "absolute",
		top: 8,
		left: 8,
		backgroundColor: "#FFD700",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
		zIndex: 1,
	},

	badgeText: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#000",
	},

	imageWrapper: {
		backgroundColor: "#0F172A",
		padding: 6,
		borderRadius: 10,
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
