import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function ScreenLoader() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" />
			<Text>Loading...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
	},
});
