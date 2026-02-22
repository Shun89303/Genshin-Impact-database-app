import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function PotionsScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Potions Screen</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/resources/consumables/potions/[id]",
						params: { id: 5 },
					})
				}
			/>
		</View>
	);
}
