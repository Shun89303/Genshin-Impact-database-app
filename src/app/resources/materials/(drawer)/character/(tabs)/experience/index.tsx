import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CharacterExperienceMaterials() {
	const router = useRouter();

	return (
		<View>
			<Text>Character Experience Materials</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/resources/materials/details/character/experience/[id]",
						params: { id: 13 },
					})
				}
			/>
		</View>
	);
}
