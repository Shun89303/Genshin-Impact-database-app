import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function BossesDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Boss Details</Text>
			<Text>Boss ID: {id}</Text>
		</View>
	);
}
