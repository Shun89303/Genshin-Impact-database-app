import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import { BASE_URL } from "@/src/config/env";
import { useTalentBookMaterialsStore } from "@/src/store/useTalentBookStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function MaterialsList() {
	const materials = endpoints.materials;
	const talentBook = endpoints.talentBook;

	const fetchMaterialsObject = useTalentBookMaterialsStore(
		(state) => state.fetchMaterialsObject
	);
	const fetchMaterialIds = useTalentBookMaterialsStore(
		(state) => state.fetchMaterialIds
	);
	const materialIds = useTalentBookMaterialsStore((state) => state.materialIds);
	const error = useTalentBookMaterialsStore((state) => state.error);

	useEffect(() => {
		if (!materialIds?.length) {
			fetchMaterialsObject();
			fetchMaterialIds();
			return;
		}

		const remainingIds = materialIds.slice(15);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${talentBook}/${id}`);
		});
	}, [
		materials,
		talentBook,
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
