import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import SearchBar from "@/src/components/utils/cim/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useCookingMaterialsStore } from "@/src/store/useCookingMaterialsStore";
import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
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
				Image.prefetch(`${BASE_URL}${materials}${cookingIngredients}/${id}`);
			});
			setLoading(false);
		}
	}, [materials, cookingIngredients, fetchAllDetails, materialIds, details]);

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
