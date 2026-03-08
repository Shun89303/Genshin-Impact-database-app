import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingHorizontal: 16,
		paddingTop: 8,
		backgroundColor: "#F8F8F8", // light neutral white background
	},

	contentContainer: {
		paddingBottom: 24,
		gap: 16,
	},

	groupContainer: {
		gap: 12,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#E0E0E0", // subtle light gray border
		padding: 8,
	},

	groupTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#111111", // dark text for readability
	},

	horizontalList: {
		paddingVertical: 8,
		gap: 12,
	},

	characterWrapper: {
		marginRight: 12,
		backgroundColor: "#FFFFFF", // slightly off-white card for items
		// borderRadius: 12,
		// borderWidth: 1,
		// borderColor: "#E0E0E0", // subtle light gray border
		// padding: 8,
	},
});

export default styles;
