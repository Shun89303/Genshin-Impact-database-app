import MaterialDetails from "@/src/components/screens/resources/materials/weapon/ascension/details/materialDetails";
import styles from "@/src/components/styles.modules";
import { useAscensionWeaponMaterials } from "@/src/hooks/useMaterials.weapon.ascension";

import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeaponAscensionMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();
	const { details, isLoading, isRefreshing, refetch, error } =
		useAscensionWeaponMaterials();

	const matchedItem = details.find((mat) =>
		mat.items.find((item) => item.id === id)
	);

	if (isLoading || !matchedItem) {
		return (
			<SafeAreaView>
				<Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
					Loading Item: {id}
				</Text>
				<ActivityIndicator />
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView style={styles.simpleContainer}>
				<Text>{error}</Text>
			</SafeAreaView>
		);
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
