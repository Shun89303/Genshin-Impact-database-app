import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function EnemiesScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Enemies</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/resources/enemies/[id]",
						params: { id: 17 },
					})
				}
			/>
		</View>
	);
}
