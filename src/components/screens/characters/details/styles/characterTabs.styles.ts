import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingVertical: 12,
		paddingHorizontal: 8,
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
		color: "#94A3B8",
	},
	activeTabText: {
		fontWeight: "bold",
		color: "#fff",
	},
});

export default styles;
