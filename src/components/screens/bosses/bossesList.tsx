import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useBossesStore } from "@/src/store/useBossesStore";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../../styles.modules";
import BossImage from "./bossImage";

export default function BossesList() {
	const fetchBosssesIds = useBossesStore((state) => state.fetchBossesIds);
	const ids = useBossesStore((state) => state.ids);
	const { error } = useBossesStore();

	const boss = endpoints.boss;
	const weeklyBoss = endpoints.weeklyBoss;
	const icon = endpoints.icon;

	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const loadBosses = useCallback(async () => {
		setLoading(true);

		try {
			await fetchBosssesIds();
		} finally {
			setLoading(false);
		}
	}, [fetchBosssesIds]);

	useEffect(() => {
		loadBosses();
	}, [loadBosses]);

	useEffect(() => {
		if (!ids.length) return;

		const remainingIds = ids.slice(3);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${boss}${weeklyBoss}/${id}${icon}`);
		});
	}, [ids, boss, weeklyBoss, icon]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadBosses();
		setRefreshing(false);
	}, [loadBosses]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={ids}
				keyExtractor={(id) => id}
				numColumns={3}
				initialNumToRender={3}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => <BossImage id={item} />}
			/>
		</View>
	);
}
