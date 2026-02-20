import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function WeaponsDetailsScreen() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Weapon Details</Text>
			<Text>Weapon ID: {id}</Text>
		</View>
	);
}
