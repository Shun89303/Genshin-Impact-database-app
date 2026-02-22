import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function BossesScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Bosses</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/bosses/[id]",
						params: { id: 5 },
					})
				}
			/>
		</View>
	);
}
