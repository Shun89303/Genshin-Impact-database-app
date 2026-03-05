import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0F172A",
	},

	imageContainer: {
		alignItems: "center",
		marginTop: 24,
	},

	weaponImage: {
		width: 140,
		height: 140,
		borderRadius: 16,
	},

	tabHeader: {
		flexShrink: 0,
		marginBottom: 20,
	},

	scrollContainer: {
		flex: 1,
		paddingHorizontal: 16,
	},

	scrollContent: {
		paddingBottom: 40,
	},
});

export default styles;
