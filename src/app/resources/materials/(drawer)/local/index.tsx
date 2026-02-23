import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function LocalSpecialties() {
	const router = useRouter();

	return (
		<View>
			<Text>Local Specialties Materials</Text>
			<Button
				title="Show details"
				onPress={() =>
					router.push({
						pathname: "/resources/materials/details/local/[id]",
						params: { id: 23 },
					})
				}
			/>
		</View>
	);
}
