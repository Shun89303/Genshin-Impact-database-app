import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import SearchBar from "@/src/components/utils/filter/commonMaterial/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useCommonAscensionMaterialsStore } from "@/src/store/useCommonAscensionStore";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import SearchList from "./searchList";

export default function MaterialsList() {
	const fetchAllDetails = useCommonAscensionMaterialsStore(
		(state) => state.fetchAllDetails
	);
	const details = useCommonAscensionMaterialsStore((state) => state.details);
	const input = useCommonAscensionMaterialsStore((state) => state.input);
	const materialIds = useCommonAscensionMaterialsStore(
		(state) => state.materialIds
	);
	const error = useCommonAscensionMaterialsStore((state) => state.error);

	const materials = endpoints.materials;
	const commonAscension = endpoints.commonAscension;

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

		const remainingIds = materialIds.slice(12);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${commonAscension}/${id}`);
		});
	}, [materialIds, materials, commonAscension]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadMaterials();
		setRefreshing(false);
	}, [loadMaterials]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result
				.map((group) => {
					const filteredItems = group.items.filter((item) =>
						item.name.toLowerCase().includes(lower)
					);

					if (filteredItems.length === 0) return null;

					return {
						...group,
						items: filteredItems,
					};
				})
				.filter((group) => group !== null);
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
