import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function FoodsScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Foods</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/resources/consumables/foods/[id]",
						params: { id: 5 },
					})
				}
			/>
		</View>
	);
}
