import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ConsumablesDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Consumables Details</Text>
			<Text>Consumables ID: {id}</Text>
		</View>
	);
}
