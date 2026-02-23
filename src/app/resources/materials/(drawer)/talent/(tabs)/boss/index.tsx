import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function TalentBossScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Talent Boss Materials</Text>
			<Button
				title="Show details"
				onPress={() =>
					router.push({
						pathname: "/resources/materials/details/talent/boss/[id]",
						params: { id: 12 },
					})
				}
			/>
		</View>
	);
}
