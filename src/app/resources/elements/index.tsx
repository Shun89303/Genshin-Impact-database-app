import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function ElementsScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Elements</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/resources/elements/[id]",
						params: { id: 6 },
					})
				}
			/>
		</View>
	);
}
