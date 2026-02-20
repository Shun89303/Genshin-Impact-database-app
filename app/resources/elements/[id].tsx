import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ElementsDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Element Details</Text>
			<Text>Element ID: {id}</Text>
		</View>
	);
}
