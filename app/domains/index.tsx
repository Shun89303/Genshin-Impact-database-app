import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function DomainsScreen() {
	const router = useRouter();
	return (
		<View>
			<Text>Domains</Text>
			<Button title="Boss" onPress={() => router.push("/domains/bosses")} />
		</View>
	);
}
