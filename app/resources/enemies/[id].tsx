import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EnemiesDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Enemy Details</Text>
			<Text>Enemy ID: {id}</Text>
		</View>
	);
}
