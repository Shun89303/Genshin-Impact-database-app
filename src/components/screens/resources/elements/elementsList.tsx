import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import { BASE_URL } from "@/src/config/env";
import { useElements } from "@/src/hooks/useElements";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import ElementCard from "./elementCard";

export default function ElementsList() {
	const elements = endpoints.elements;
	const icon = endpoints.icon;

	const { details, error, isLoading, isRefreshing, refetch } = useElements();

	useEffect(() => {
		if (!details.length) return;

		details.forEach((element) => {
			Image.prefetch(`${BASE_URL}${elements}/${element.id}${icon}`);
		});
	}, [details, elements, icon]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No potions found"} onRetry={refetch} />;

	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={details}
				keyExtractor={(element) => element.id}
				removeClippedSubviews
				refreshing={isRefreshing}
				onRefresh={refetch}
				renderItem={({ item }) => (
					<ElementCard
						name={item.name}
						reactions={item.reactions ?? []}
						id={item.id}
					/>
				)}
			/>
		</View>
	);
}
