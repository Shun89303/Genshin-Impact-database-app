import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function MaterialsScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Materials</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/resources/materials/[id]",
						params: { id: 24 },
					})
				}
			/>
		</View>
	);
}
