import PotionDetails from "@/src/components/screens/resources/consumables/potions/details/potionDetails";
import { usePotionConsumables } from "@/src/hooks/useConsumables.potion";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PotionDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();

	const { details, isLoading, isRefreshing, refetch } = usePotionConsumables();
	const potion = details.find((p) => p.id === id);

	if (isLoading || !potion) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Loading potion...</Text>
			</View>
		);
	}

	return (
		<PotionDetails
			potion={potion}
			refreshing={isRefreshing}
			onRefresh={refetch}
		/>
	);
}
