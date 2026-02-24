import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useBossMaterialsStore } from "@/src/store/useBossMaterialsStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function MaterialsList() {
	const materials = endpoints.materials;
	const bossMaterials = endpoints.bossMaterials;

	const fetchMaterialsObject = useBossMaterialsStore(
		(state) => state.fetchMaterialsObject
	);
	const fetchMaterialIds = useBossMaterialsStore(
		(state) => state.fetchMaterialIds
	);
	const materialIds = useBossMaterialsStore((state) => state.materialIds);
	const error = useBossMaterialsStore((state) => state.error);

	useEffect(() => {
		if (!materialIds?.length) {
			fetchMaterialsObject();
			fetchMaterialIds();
			return;
		}

		const remainingIds = materialIds.slice(15);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${bossMaterials}/${id}`);
		});
	}, [
		materials,
		bossMaterials,
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
