import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingVertical: 12,
		paddingHorizontal: 8,
		backgroundColor: "#f5f5f5",
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		alignItems: "center",
	},
	tabButton: {
		paddingVertical: 6,
		paddingHorizontal: 14,
		borderRadius: 8,
		marginRight: 8,
		alignSelf: "center",
	},
	activeTabButton: {
		backgroundColor: "#007aff",
	},
	tabText: {
		fontSize: 14,
		color: "#555",
	},
	activeTabText: {
		fontWeight: "bold",
		color: "#fff",
	},
});

export default styles;
