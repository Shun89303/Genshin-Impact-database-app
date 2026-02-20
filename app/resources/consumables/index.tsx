import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function ConsumablesScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Consumables</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/resources/consumables/[id]",
						params: { id: 12 },
					})
				}
			/>
		</View>
	);
}
