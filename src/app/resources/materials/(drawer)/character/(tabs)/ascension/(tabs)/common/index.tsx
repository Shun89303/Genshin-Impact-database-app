import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CommonAscensionMaterials() {
	const router = useRouter();

	return (
		<View>
			<Text>Common Ascension Materials</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname:
							"/resources/materials/details/character/ascension/common/[id]",
						params: { id: 12 },
					})
				}
			/>
		</View>
	);
}
