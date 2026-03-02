import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useCharacterExperienceMaterialsStore } from "@/src/store/useCharacterExperienceStore";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function MaterialsList() {
	const fetchMaterialIds = useCharacterExperienceMaterialsStore(
		(state) => state.fetchMaterialIds
	);
	const materialIds = useCharacterExperienceMaterialsStore(
		(state) => state.materialIds
	);
	const error = useCharacterExperienceMaterialsStore((state) => state.error);

	const materials = endpoints.materials;
	const characterExperience = endpoints.characterExperience;

	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const loadMaterials = useCallback(async () => {
		setLoading(true);

		try {
			await fetchMaterialIds();
		} finally {
			setLoading(false);
		}
	}, [fetchMaterialIds]);

	useEffect(() => {
		loadMaterials();
	}, [loadMaterials]);

	useEffect(() => {
		if (!materialIds.length) return;

		materialIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${characterExperience}/${id}`);
		});
	}, [materialIds, materials, characterExperience]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadMaterials();
		setRefreshing(false);
	}, [loadMaterials]);

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);
	}

	if (loading) {
		return (
			<View>
				<ActivityIndicator
					size="large"
					style={{
						position: "absolute",
						top: 30,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				/>
			</View>
		);
	}

	return (
		<>
			<FlatList
				data={materialIds}
				keyExtractor={(id) => id}
				numColumns={3}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => <MaterialsImage id={item} />}
			/>
		</>
	);
}
