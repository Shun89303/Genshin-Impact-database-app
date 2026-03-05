import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 24,
		gap: 18,
		backgroundColor: "#1E293B",
		borderRadius: 18,
	},

	textSection: {
		alignItems: "center",
		gap: 6,
		maxWidth: 600,
	},

	name: {
		fontSize: 26,
		fontWeight: "700",
		color: "#FFFFFF",
	},

	title: {
		fontSize: 16,
		fontStyle: "italic",
		color: "#94A3B8",
	},

	description: {
		marginTop: 8,
		fontSize: 15,
		lineHeight: 22,
		color: "#CBD5F5",
		textAlign: "center",
	},

	iconRow: {
		flexDirection: "row",
		gap: 14,
		marginTop: 8,
	},

	icon: {
		width: 42,
		height: 42,
		borderRadius: 8,
		backgroundColor: "#1E293B",
		padding: 4,
	},
});

export default styles;
