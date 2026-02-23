import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function TalentBookScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Talent Book Materials</Text>
			<Button
				title="Show details"
				onPress={() =>
					router.push({
						pathname: "/resources/materials/details/talent/book/[id]",
						params: { id: 12 },
					})
				}
			/>
		</View>
	);
}
