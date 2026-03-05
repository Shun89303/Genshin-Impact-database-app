import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 8,
		backgroundColor: "#0F172A",
	},

	tabButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginRight: 8,
		borderRadius: 12,
		backgroundColor: "#1E293B",
	},

	activeTabButton: {
		backgroundColor: "#3B82F6",
	},

	tabText: {
		color: "#94A3B8",
		fontWeight: "600",
		fontSize: 14,
	},

	activeTabText: {
		color: "#F1F5F9",
	},
});

export default styles;
