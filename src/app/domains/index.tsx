import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function DomainsScreen() {
	const router = useRouter();
	return (
		<View>
			<Text>Domains</Text>
			<Button
				title="Show Details"
				onPress={() =>
					router.push({
						pathname: "/domains/[id]",
						params: { id: 25 },
					})
				}
			/>
			<Button title="Boss" onPress={() => router.push("/domains/bosses")} />
		</View>
	);
}
