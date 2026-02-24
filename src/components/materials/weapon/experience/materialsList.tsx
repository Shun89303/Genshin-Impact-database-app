import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useWeaponExperienceMaterialsStore } from "@/src/store/useWeaponExperienceStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function MaterialsList() {
	const materials = endpoints.materials;
	const weaponExperience = endpoints.weaponExperience;

	const fetchMaterialsObject = useWeaponExperienceMaterialsStore(
		(state) => state.fetchMaterialsObject
	);
	const fetchMaterialIds = useWeaponExperienceMaterialsStore(
		(state) => state.fetchMaterialIds
	);
	const materialIds = useWeaponExperienceMaterialsStore(
		(state) => state.materialIds
	);
	const error = useWeaponExperienceMaterialsStore((state) => state.error);

	useEffect(() => {
		if (!materialIds?.length) {
			fetchMaterialsObject();
			fetchMaterialIds();
			return;
		}

		const remainingIds = materialIds.slice(15);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${weaponExperience}/${id}`);
		});
	}, [
		materials,
		weaponExperience,
		fetchMaterialIds,
		fetchMaterialsObject,
		materialIds,
	]);

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!materialIds?.length) {
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);
	}
	return (
		<>
			<FlatList
				data={materialIds}
				keyExtractor={(id) => id}
				numColumns={3}
				initialNumToRender={15}
				windowSize={20}
				removeClippedSubviews
				renderItem={({ item }) => <MaterialsImage id={item} />}
			/>
		</>
	);
}
