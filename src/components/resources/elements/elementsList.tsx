import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useElementsStore } from "@/src/store/useElementsStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../../styles.modules";
import ElementImage from "./elementImage";

export default function ElementsList() {
	const fetchElementsIds = useElementsStore((state) => state.fetchElementsIds);
	const ids = useElementsStore((state) => state.ids);
	const { error } = useElementsStore();
	const elements = endpoints.elements;
	const icon = endpoints.icon;

	useEffect(() => {
		if (!ids || ids.length === 0) {
			fetchElementsIds();
			return;
		}

		const remainingIds = ids.slice(10);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${elements}/${id}${icon}`);
		});
	}, [fetchElementsIds, ids, elements, icon]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!ids?.length)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<>
			<FlatList
				data={ids}
				keyExtractor={(id) => id}
				numColumns={3}
				initialNumToRender={9}
				windowSize={20}
				removeClippedSubviews
				renderItem={({ item }) => <ElementImage id={item} />}
			/>
		</>
	);
}
