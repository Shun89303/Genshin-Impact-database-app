import ScreenLoader from "@/src/components/common/ScreenLoader";
import MaterialDetails from "@/src/components/screens/resources/materials/weapon/ascension/details/materialDetails";
import { useAscensionWeaponMaterials } from "@/src/hooks/useMaterials.weapon.ascension";

import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function WeaponAscensionMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();
	const { details, isLoading, isRefreshing, refetch, error } =
		useAscensionWeaponMaterials();

	const matchedItem = details.find((mat) =>
		mat.items.find((item) => item.id === id)
	);

	if (isLoading || !matchedItem) {
		return <ScreenLoader />;
	}

	return (
		<View style={{ flex: 1 }}>
			<MaterialDetails
				material={matchedItem}
				refreshing={isRefreshing}
				onRefresh={refetch}
			/>
		</View>
	);
}
