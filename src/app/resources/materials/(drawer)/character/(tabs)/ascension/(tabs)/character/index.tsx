import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CharacterAscentionMats() {
	const router = useRouter();

	return (
		<View>
			<Text>Character Ascention Materials</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname:
							"/resources/materials/details/character/ascension/character/[id]",
						params: { id: 25 },
					})
				}
			/>
		</View>
	);
}
