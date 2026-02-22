import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useBossesStore } from "@/src/store/useBossesStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../styles.modules";
import BossImage from "./bossImage";

export default function BossesList() {
	const fetchBosssesIds = useBossesStore((state) => state.fetchBossesIds);
	const ids = useBossesStore((state) => state.ids);
	const { error } = useBossesStore();
	const boss = endpoints.boss;
	const weeklyBoss = endpoints.weeklyBoss;
	const icon = endpoints.icon;

	useEffect(() => {
		if (!ids || ids.length === 0) {
			fetchBosssesIds();
			return;
		}

		const remainingIds = ids.slice(5);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${boss}${weeklyBoss}/${id}${icon}`);
		});
	}, [fetchBosssesIds, boss, weeklyBoss, icon, ids]);

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
				initialNumToRender={5}
				windowSize={5}
				removeClippedSubviews
				renderItem={({ item }) => <BossImage id={item} />}
			/>
		</>
	);
}
