import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function CharacterDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Character Details</Text>
			<Text>Character ID: {id}</Text>
		</View>
	);
}
