import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useElementsStore } from "@/src/store/useElementsStore";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../../styles.modules";
import ElementImage from "./elementImage";

export default function ElementsList() {
	const fetchElementsIds = useElementsStore((state) => state.fetchElementsIds);
	const ids = useElementsStore((state) => state.ids);
	const { error } = useElementsStore();

	const elements = endpoints.elements;
	const icon = endpoints.icon;

	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const loadMaterials = useCallback(async () => {
		setLoading(true);

		try {
			await fetchElementsIds();
		} finally {
			setLoading(false);
		}
	}, [fetchElementsIds]);

	useEffect(() => {
		loadMaterials();
	}, [loadMaterials]);

	useEffect(() => {
		if (!ids.length) return;

		ids.forEach((id) => {
			Image.prefetch(`${BASE_URL}${elements}/${id}${icon}`);
		});
	}, [ids, elements, icon]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadMaterials();
		setRefreshing(false);
	}, [loadMaterials]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

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
				data={ids}
				keyExtractor={(id) => id}
				horizontal
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={{
					marginTop: 20,
				}}
				renderItem={({ item }) => <ElementImage id={item} />}
			/>
		</>
	);
}
