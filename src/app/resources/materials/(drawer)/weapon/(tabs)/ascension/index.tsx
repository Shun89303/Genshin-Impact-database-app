import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function AscensionScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Weapon Ascension Materials</Text>
			<Button
				title="Show details"
				onPress={() =>
					router.push({
						pathname: "/resources/materials/details/weapon/ascension/[id]",
						params: { id: 5 },
					})
				}
			/>
		</View>
	);
}
