import ArtifactDetails from "@/src/components/artifacts/artifactDetails";
import styles from "@/src/components/styles.modules";
import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function WeaponsDetailsScreen() {
	const { id } = useLocalSearchParams();
	const fetchWeaponDetails = useWeaponsStore(
		(state) => state.fetchWeaponDetails
	);
	const error = useWeaponsStore((state) => state.error);
	const [data, setData] = useState<Record<string, unknown> | any>();

	useEffect(() => {
		if (!id || Array.isArray(id)) return;

		const load = async () => {
			const details = await fetchWeaponDetails(id);
			setData(details);
		};
		load();
	}, [fetchWeaponDetails, id]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!data)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<View>
			<Text style={{ textAlign: "center" }}>Weapon Details</Text>
			<FlatList
				data={Object.entries(data)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<ArtifactDetails field={field} value={value} />
				)}
			/>
		</View>
	);
}
