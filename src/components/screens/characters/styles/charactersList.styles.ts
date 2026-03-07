import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		// backgroundColor: "#0F172A",
		backgroundColor: "#1E2A3A",
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
		// backgroundColor: "#1E293B",
		backgroundColor: "#0F172A",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},

	sheetIndicator: {
		backgroundColor: "#64748B",
		width: 40,
	},

	sheetContent: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
});

export default styles;
