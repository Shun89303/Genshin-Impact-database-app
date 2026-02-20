import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CharactersScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Characters</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({ pathname: "/characters/[id]", params: { id: "3" } })
				}
			/>
		</View>
	);
}
