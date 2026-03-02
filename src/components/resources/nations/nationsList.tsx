import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useNationsStore } from "@/src/store/useNationsStore";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../../styles.modules";
import NationImage from "./nationImage";

export default function NationsList() {
	const fetchNationsIds = useNationsStore((state) => state.fetchNationsIds);
	const ids = useNationsStore((state) => state.ids);
	const { error } = useNationsStore();

	const nations = endpoints.nations;
	const icon = endpoints.icon;

	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const loadMaterials = useCallback(async () => {
		setLoading(true);

		try {
			await fetchNationsIds();
		} finally {
			setLoading(false);
		}
	}, [fetchNationsIds]);

	useEffect(() => {
		loadMaterials();
	}, [loadMaterials]);

	useEffect(() => {
		if (!ids.length) return;

		ids.forEach((id) => {
			Image.prefetch(`${BASE_URL}${nations}/${id}${icon}`);
		});
	}, [ids, nations, icon]);

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
				numColumns={3}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => <NationImage id={item} />}
			/>
		</>
	);
}
