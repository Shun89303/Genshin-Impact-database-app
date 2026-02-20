import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DomainsDetailsScreen() {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Text>Domain Details</Text>
			<Text>Domain ID: {id}</Text>
		</View>
	);
}
