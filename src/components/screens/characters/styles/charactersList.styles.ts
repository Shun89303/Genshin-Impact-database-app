import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#0F172A",
	},

	container: {
		flex: 1,
		paddingHorizontal: 16,
	},

	list: {
		flex: 1,
	},

	sheetBackground: {
		backgroundColor: "#1E293B",
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
