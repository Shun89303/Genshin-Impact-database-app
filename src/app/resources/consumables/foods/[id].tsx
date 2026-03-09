import ScreenLoader from "@/src/components/common/ScreenLoader";
import FoodDetails from "@/src/components/screens/resources/consumables/food/details/foodDetails";
import { useFoodConsumables } from "@/src/hooks/useConsumables.food";
import { useLocalSearchParams } from "expo-router";

export default function FoodDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();

	const { details, isLoading, isRefreshing, refetch } = useFoodConsumables();
	const food = details.find((f) => f.id === id);

	if (isLoading || !food) {
		return <ScreenLoader />;
	}

	return (
		<FoodDetails food={food} refreshing={isRefreshing} onRefresh={refetch} />
	);
}
