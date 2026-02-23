import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function ExperienceScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Weapon Experience Materials</Text>
			<Button
				title="Show details"
				onPress={() =>
					router.push({
						pathname: "/resources/materials/details/weapon/experience/[id]",
						params: { id: 5 },
					})
				}
			/>
		</View>
	);
}
