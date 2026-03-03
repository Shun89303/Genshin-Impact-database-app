import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useBosses } from "@/src/hooks/useBosses";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import EmptyState from "../../ui/EmptyState";
import ErrorState from "../../ui/ErrorState";
import ScreenLoader from "../../ui/ScreenLoader";
import BossImage from "./bossImage";

export default function BossesList() {
	const boss = endpoints.boss;
	const weeklyBoss = endpoints.weeklyBoss;
	const icon = endpoints.icon;

	const { ids, error, isLoading, isRefreshing, refetch } = useBosses();

	useEffect(() => {
		if (!ids.length) return;

		const remainingIds = ids.slice(3);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${boss}${weeklyBoss}/${id}${icon}`);
		});
	}, [ids, boss, weeklyBoss, icon]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (ids.length === 0)
		return <EmptyState message={"No characters found"} onRetry={refetch} />;

	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={ids}
				keyExtractor={(id) => id}
				numColumns={3}
				initialNumToRender={3}
				windowSize={21}
				removeClippedSubviews
				refreshing={isRefreshing}
				onRefresh={refetch}
				renderItem={({ item }) => <BossImage id={item} />}
			/>
		</View>
	);
}
