import ScreenLoader from "@/src/components/common/ScreenLoader";
import PotionDetails from "@/src/components/screens/resources/consumables/potions/details/potionDetails";
import { usePotionConsumables } from "@/src/hooks/useConsumables.potion";
import { useLocalSearchParams } from "expo-router";

export default function PotionDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();

	const { details, isLoading, isRefreshing, refetch } = usePotionConsumables();
	const potion = details.find((p) => p.id === id);

	if (isLoading || !potion) {
		return <ScreenLoader />;
	}

	return (
		<PotionDetails
			potion={potion}
			refreshing={isRefreshing}
			onRefresh={refetch}
		/>
	);
}
