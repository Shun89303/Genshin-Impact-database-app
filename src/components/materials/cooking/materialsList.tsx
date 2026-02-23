import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useCookingMaterialsStore } from "@/src/store/useCookingMaterialsStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import styles from "../../styles.modules";
import MaterialsImage from "./materialsImage";

export default function MaterialsList() {
	const materials = endpoints.materials;
	const cookingIngredients = endpoints.cookingIngredients;

	const fetchMaterialsObject = useCookingMaterialsStore(
		(state) => state.fetchMaterialsObject
	);
	const fetchMaterialIds = useCookingMaterialsStore(
		(state) => state.fetchMaterialIds
	);
	const materialIds = useCookingMaterialsStore((state) => state.materialIds);
	const error = useCookingMaterialsStore((state) => state.error);

	useEffect(() => {
		if (!materialIds?.length) {
			fetchMaterialsObject();
			fetchMaterialIds();
			return;
		}

		const remainingIds = materialIds.slice(15);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${cookingIngredients}/${id}`);
		});
	}, [
		materials,
		cookingIngredients,
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
