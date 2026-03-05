import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmptyState({
	message,
	onRetry,
}: {
	message: string;
	onRetry: () => void;
}) {
	return (
		<View style={styles.container}>
			<Text style={styles.message}>{message}</Text>
			<TouchableOpacity style={styles.button} onPress={onRetry}>
				<Text style={styles.buttonText}>Retry</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		backgroundColor: "#0F172A",
	},
	message: {
		fontSize: 20,
		fontWeight: "600",
		color: "#333",
		textAlign: "center",
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#007AFF",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 8,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
		textAlign: "center",
	},
	loader: {
		marginTop: 10,
	},
});
