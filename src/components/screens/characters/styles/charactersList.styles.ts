import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#F8F8F8", // light neutral white
		paddingVertical: 12,
	},

	container: {
		flex: 1,
		paddingHorizontal: 16,
	},

	refreshSpinner: {
		alignItems: "center",
		marginVertical: 14,
	},

	list: {
		flex: 1,
	},

	sheetBackground: {
		backgroundColor: "#FFFFFF", // pure white
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		borderWidth: 1,
		borderColor: "#E0E0E0", // visible light gray border
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 3,
	},

	sheetIndicator: {
		backgroundColor: "#E5E7EB", // very light gray
		width: 40,
		height: 4,
		borderRadius: 2,
		alignSelf: "center",
		marginVertical: 8,
	},

	sheetContent: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},

	card: {
		backgroundColor: "#FCFCFC", // slightly off-white
		borderRadius: 12,
		padding: 16,
		marginVertical: 8,
		borderWidth: 1,
		borderColor: "#D9D9D9", // light gray borders
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
	},
});

export default styles;
