import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function MaterialsDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Material Details</Text>
			<Text>Material ID: {id}</Text>
		</View>
	);
}
