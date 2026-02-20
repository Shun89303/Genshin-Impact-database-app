import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function ArtifactsScreen() {
	const router = useRouter();

	return (
		<View>
			<Text>Artifacts</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/artifacts/[id]",
						params: { id: 10 },
					})
				}
			/>
		</View>
	);
}
