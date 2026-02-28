import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import SearchBar from "@/src/components/utils/talentBoss/searchBar";
import { BASE_URL } from "@/src/config/env";
import { useTalentBossMaterialsStore } from "@/src/store/useTalentBossStore";
import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import SearchList from "./searchList";

export default function MaterialsList() {
	const fetchAllDetails = useTalentBossMaterialsStore(
		(state) => state.fetchAllDetails
	);
	const details = useTalentBossMaterialsStore((state) => state.details);
	const input = useTalentBossMaterialsStore((state) => state.input);
	const materialIds = useTalentBossMaterialsStore((state) => state.materialIds);
	const error = useTalentBossMaterialsStore((state) => state.error);

	const materials = endpoints.materials;
	const talentBoss = endpoints.talentBoss;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				await fetchAllDetails();
			} finally {
				setLoading(false);
			}
		};

		if (!details.length) {
			load();
		} else {
			// PREFETCH IMAGES
			materialIds.forEach((id) => {
				Image.prefetch(`${BASE_URL}${materials}${talentBoss}/${id}`);
			});
			setLoading(false);
		}
	}, [fetchAllDetails, materials, details, materialIds, talentBoss]);

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

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<>
			{loading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>
			)}
			<SearchBar />
			<SearchList finalData={finalData} />
		</>
	);
}
