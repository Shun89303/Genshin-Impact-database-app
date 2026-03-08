import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 8,
	},

	contentContainer: {
		paddingBottom: 24,
		gap: 16,
	},

	groupContainer: {
		gap: 12,
		borderWidth: 1,
		borderColor: "#E6ECF3", // soft light border
		borderRadius: 12, // rounded corners
		padding: 12, // add inner spacing
		backgroundColor: "#F8FAFC", // soft background
	},

	groupTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#000000ff",
	},

	horizontalList: {
		paddingVertical: 8,
		gap: 12,
	},

	characterWrapper: {
		marginRight: 12,
	},
});

export default styles;
