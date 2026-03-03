import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import { BASE_URL } from "@/src/config/env";
import { useElements } from "@/src/hooks/useElements";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import ElementImage from "./elementImage";

export default function ElementsList() {
	const elements = endpoints.elements;
	const icon = endpoints.icon;

	const { ids, error, isLoading, isRefreshing, refetch } = useElements();

	useEffect(() => {
		if (!ids.length) return;

		ids.forEach((id) => {
			Image.prefetch(`${BASE_URL}${elements}/${id}${icon}`);
		});
	}, [ids, elements, icon]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (ids.length === 0)
		return <EmptyState message={"No potions found"} onRetry={refetch} />;

	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={ids}
				keyExtractor={(id) => id}
				horizontal
				removeClippedSubviews
				refreshing={isRefreshing}
				onRefresh={refetch}
				contentContainerStyle={{
					marginTop: 20,
				}}
				renderItem={({ item }) => <ElementImage id={item} />}
			/>
		</View>
	);
}
