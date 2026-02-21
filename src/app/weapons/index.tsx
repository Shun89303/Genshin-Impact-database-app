import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function WeaponsScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Weapons</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({ pathname: "/weapons/[id]", params: { id: 5 } })
				}
			/>
		</View>
	);
}
