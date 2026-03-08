import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingScreen() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#000" />
			<Text style={styles.text}>Loading...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, // full screen
		justifyContent: "center", // center vertically
		alignItems: "center", // center horizontally
		backgroundColor: "#fff", // neutral background
	},
	text: {
		marginTop: 12,
		fontSize: 16,
		color: "#333",
	},
});
