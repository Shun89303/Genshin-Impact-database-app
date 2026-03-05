import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ScreenLoader() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="white" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0F172A",
	},
});
