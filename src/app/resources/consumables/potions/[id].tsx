import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PotionDetailsScreen() {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Text>Potion Details</Text>
			<Text>Potion id: {id}</Text>
		</View>
	);
}
