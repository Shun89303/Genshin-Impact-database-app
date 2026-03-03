import { endpoints } from "@/src/api/endpoints";
import EmptyState from "@/src/components/ui/EmptyState";
import ErrorState from "@/src/components/ui/ErrorState";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import SearchBar from "@/src/components/utils/filter/talentBoss/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useBossTalentMaterials } from "@/src/hooks/useMaterials.talent.boss";
import { useTalentBossMaterialsStore } from "@/src/store/useTalentBossStore";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import SearchList from "./searchList";

export default function MaterialsList() {
	const input = useTalentBossMaterialsStore((state) => state.input);
	const materialIds = useTalentBossMaterialsStore((state) => state.materialIds);

	const materials = endpoints.materials;
	const talentBoss = endpoints.talentBoss;

	const { details, error, isLoading, isRefreshing, refetch } =
		useBossTalentMaterials();

	useEffect(() => {
		if (!materialIds.length) return;

		const remainingIds = materialIds.slice(9);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${materials}${talentBoss}/${id}`);
		});
	}, [materialIds, materials, talentBoss]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter(
				(boss) =>
					boss.id.toLowerCase().includes(lower) ||
					boss.name.toLowerCase().includes(lower)
			);
		}

		return result;
	}, [details, input]);

	if (isLoading) return <ScreenLoader />;
	if (error) return <ErrorState message={error} onRetry={refetch} />;
	if (details.length === 0)
		return <EmptyState message={"No materials found"} onRetry={refetch} />;

	return (
		<>
			<SearchBar />
			<SearchList
				finalData={finalData}
				refreshing={isRefreshing}
				onRefresh={refetch}
			/>
		</>
	);
}
