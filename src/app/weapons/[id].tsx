import styles from "@/src/components/styles.modules";
import WeaponDetails from "@/src/components/weapons/weaponDetails";
import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeaponsDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();
	const fetchWeaponDetails = useWeaponsStore(
		(state) => state.fetchWeaponDetails
	);
	const error = useWeaponsStore((state) => state.error);
	const cache = useWeaponsStore((state) => state.cache);
	const loadingId = useWeaponsStore((state) => state.loadingId);

	useFocusEffect(
		useCallback(() => {
			fetchWeaponDetails(id);
		}, [fetchWeaponDetails, id])
	);

	const loading = loadingId === id;
	const details = cache[id];

	if (loading || !details)
		return (
			<SafeAreaView>
				<Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
					Loading Item: {id}
				</Text>
				<ActivityIndicator />
			</SafeAreaView>
		);

	if (error)
		return (
			<SafeAreaView style={styles.simpleContainer}>
				<Text>{error}</Text>
			</SafeAreaView>
		);

	return (
		<SafeAreaView>
			<Text style={{ textAlign: "center" }}>Weapon Details</Text>
			<FlatList
				data={Object.entries(details)}
				keyExtractor={([key]) => key}
				renderItem={({ item: [field, value] }) => (
					<WeaponDetails field={field} value={value} />
				)}
			/>
		</SafeAreaView>
	);
}
