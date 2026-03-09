import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/common/EmptyState";
import ErrorState from "@/src/components/common/ErrorState";
import ScreenLoader from "@/src/components/common/ScreenLoader";
import { BASE_URL } from "@/src/config/env";
import { useExperienceWeaponMaterials } from "@/src/hooks/useMaterials.weapon.experience";
import { Image } from "expo-image";
import { useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import MaterialCard from "./materialCard";

export default function MaterialsList() {
	const { materials, weaponExperience } = endpoints;

	const { details, error, isLoading, isRefreshing, refetch } =
		useExperienceWeaponMaterials();

	useEffect(() => {
		if (!details.length) return;

		details.forEach((mat) => {
			Image.prefetch(`${BASE_URL}${materials}${weaponExperience}/${mat.id}`);
		});
	}, [details, materials, weaponExperience]);

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
