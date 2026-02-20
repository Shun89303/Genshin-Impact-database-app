import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function NationsDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Nation Details</Text>
			<Text>Nation ID: {id}</Text>
		</View>
	);
}
