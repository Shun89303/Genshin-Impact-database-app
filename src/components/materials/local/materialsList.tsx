import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useLocalMaterialsStore } from "@/src/store/useLocalMaterialsStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import styles from "../../styles.modules";
import MaterialsImage from "./materialsImage";

export default function MaterialsList() {
	const materials = endpoints.materials;
	const localSpecialties = endpoints.localSpecialties;

	const fetchMaterialsObject = useLocalMaterialsStore(
		(state) => state.fetchMaterialsObject
	);
	const fetchMaterialIds = useLocalMaterialsStore(
		(state) => state.fetchMaterialIds
	);
	const materialIds = useLocalMaterialsStore((state) => state.materialIds);
	const error = useLocalMaterialsStore((state) => state.error);

	useEffect(() => {
		if (!materialIds?.length) {
			fetchMaterialsObject();
			fetchMaterialIds();
			return;
		}

		const remainingIds = materialIds.slice(15);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${localSpecialties}/${id}`);
		});
	}, [
		materials,
		localSpecialties,
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
