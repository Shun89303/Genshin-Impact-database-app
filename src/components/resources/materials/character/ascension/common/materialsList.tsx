import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import SearchBar from "@/src/components/utils/commonMaterial/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useCommonAscensionMaterialsStore } from "@/src/store/useCommonAscensionStore";
import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
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

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				await fetchAllDetails();
			} finally {
				setLoading(false);
			}
		};

		if (!details.length) {
			load();
		} else {
			// PREFETCH IMAGES
			materialIds.forEach((id) => {
				Image.prefetch(`${BASE_URL}${materials}${commonAscension}/${id}`);
			});
		}
	}, [fetchAllDetails, details, materialIds, materials, commonAscension]);

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

	return (
		<>
			{loading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>
			)}
			<SearchBar />
			<SearchList finalData={finalData} />
		</>
	);
}
