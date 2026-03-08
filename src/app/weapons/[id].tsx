import ScreenLoader from "@/src/components/common/ScreenLoader";
import WeaponDetails from "@/src/components/screens/weapons/details/weaponDetails";
import { useWeapons } from "@/src/hooks/useWeapons";
import { useLocalSearchParams } from "expo-router";

export default function WeaponsDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();

	const { details, isLoading, isRefreshing, refetch } = useWeapons();

	const weapon = details.find((wea) => wea.id === id);

	if (isLoading || !weapon) return <ScreenLoader />;

	return (
		<WeaponDetails
			weapon={weapon}
			refreshing={isRefreshing}
			onRefresh={refetch}
		/>
	);
}
