import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function BossMaterials() {
	const router = useRouter();

	return (
		<View>
			<Text>Boss Materials</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/resources/materials/details/boss/[id]",
						params: { id: 2 },
					})
				}
			/>
		</View>
	);
}
