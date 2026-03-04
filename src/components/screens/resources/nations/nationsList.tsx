import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import { BASE_URL } from "@/src/config/env";
import { useNations } from "@/src/hooks/useNations";
import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import NationCard from "./nationCard";

export default function NationsList() {
	const nations = endpoints.nations;
	const icon = endpoints.icon;

	const { details, error, isLoading, isRefreshing, refetch } = useNations();

	useEffect(() => {
		if (!details.length) return;

		details.forEach((nation) => {
			Image.prefetch(`${BASE_URL}${nations}/${nation.id}${icon}`);
		});
	}, [details, nations, icon]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No nations found"} onRetry={refetch} />;

	return (
		<View>
			<FlatList
				data={details}
				keyExtractor={(nation) => nation.id}
				removeClippedSubviews
				refreshing={isRefreshing}
				onRefresh={refetch}
				renderItem={({ item }) => (
					<NationCard
						name={item.name}
						element={item.element}
						archon={item.archon}
						controllingEntity={item.controllingEntity}
						id={item.id}
					/>
				)}
			/>
		</View>
	);
}
