import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Nations() {
	const router = useRouter();

	return (
		<View>
			<Text>Nations</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/resources/nations/[id]",
						params: { id: 4 },
					})
				}
			/>
		</View>
	);
}
