import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import SearchBar from "@/src/components/utils/filter/cim/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useCookingMaterialsStore } from "@/src/store/useCookingMaterialsStore";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import SearchList from "./searchList";

export default function MaterialsList() {
	const fetchAllDetails = useCookingMaterialsStore(
		(state) => state.fetchAllDetails
	);
	const details = useCookingMaterialsStore((state) => state.details);
	const input = useCookingMaterialsStore((state) => state.input);
	const materialIds = useCookingMaterialsStore((state) => state.materialIds);
	const error = useCookingMaterialsStore((state) => state.error);

	const materials = endpoints.materials;
	const cookingIngredients = endpoints.cookingIngredients;

	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const loadMaterials = useCallback(async () => {
		setLoading(true);

		try {
			await fetchAllDetails();
		} finally {
			setLoading(false);
		}
	}, [fetchAllDetails]);

	useEffect(() => {
		loadMaterials();
	}, [loadMaterials]);

	useEffect(() => {
		if (!materialIds.length) return;

		const remainingIds = materialIds.slice(15);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${cookingIngredients}/${id}`);
		});
	}, [materialIds, materials, cookingIngredients]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadMaterials();
		setRefreshing(false);
	}, [loadMaterials]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((cooking) =>
				cooking.id.toLowerCase().includes(lower)
			);
		}

		return result;
	}, [details, input]);

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
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
			<SearchBar />
			<SearchList
				finalData={finalData}
				refreshing={refreshing}
				onRefresh={onRefresh}
			/>
		</>
	);
}
