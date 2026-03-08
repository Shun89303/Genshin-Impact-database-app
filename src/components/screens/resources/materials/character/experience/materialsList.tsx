import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import { BASE_URL } from "@/src/config/env";
import { useExperienceMaterials } from "@/src/hooks/useMaterials.character.experience";
import { Image } from "expo-image";
import { useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import MaterialCard from "./materialCard";

export default function MaterialsList() {
	const { materials, characterExperience } = endpoints;

	const { details, error, isLoading, isRefreshing, refetch } =
		useExperienceMaterials();

	function toEndpointId(id: string): string {
		return id.replace(/'/g, "-");
	}

	useEffect(() => {
		if (!details.length) return;

		details.forEach((mat) => {
			Image.prefetch(
				`${BASE_URL}${materials}${characterExperience}/${toEndpointId(mat.id)}`
			);
		});
	}, [details, materials, characterExperience]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No materials found"} onRetry={refetch} />;

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			refreshControl={
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={refetch}
					colors={["#000000ff"]} // Android
				/>
			}
		>
			<View style={styles.grid}>
				{details.map((mat) => (
					<MaterialCard key={mat.id} material={mat} />
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 20,
		flexGrow: 1,
		justifyContent: "center",
	},

	grid: {
		gap: 16,
	},
});
