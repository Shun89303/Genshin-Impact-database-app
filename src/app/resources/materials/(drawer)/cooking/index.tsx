import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CookingIngredientsScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Cooking Ingredients Materials</Text>
			<Button
				title="Show details"
				onPress={() =>
					router.push({
						pathname: "/resources/materials/details/cooking/[id]",
						params: { id: 18 },
					})
				}
			/>
		</View>
	);
}
