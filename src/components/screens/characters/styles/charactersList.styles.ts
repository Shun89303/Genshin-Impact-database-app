import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#F8FAFC",
		paddingVertical: 10,
	},

	container: {
		flex: 1,
		paddingHorizontal: 16,
	},

	refreshSpinner: {
		alignItems: "center",
		marginVertical: 12,
	},

	list: {
		flex: 1,
	},

	sheetBackground: {
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},

	sheetIndicator: {
		backgroundColor: "#D8E1EC",
		width: 40,
	},

	sheetContent: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
});

export default styles;
