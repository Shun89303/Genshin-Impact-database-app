import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function FoodDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Food Details</Text>
			<Text>Food id: {id}</Text>
		</View>
	);
}
