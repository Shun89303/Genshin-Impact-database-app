import { Button, Text, View } from "react-native";

export default function ErrorState({
	message,
	onRetry,
}: {
	message: any;
	onRetry: any;
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<Text style={{ fontWeight: "bold", fontSize: 20 }}>Error: {message}</Text>
			<Button title="Retry" onPress={onRetry} />
		</View>
	);
}
