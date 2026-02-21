import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../styles.modules";
import WeaponImage from "./weaponImage";

export default function WeaponsList() {
	const fetchWeaponsIds = useWeaponsStore((state) => state.fetchWeaponsIds);
	const { ids, error } = useWeaponsStore();

	useEffect(() => {
		fetchWeaponsIds();
	}, [fetchWeaponsIds]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!ids?.length)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<>
			<FlatList
				data={ids}
				keyExtractor={(id) => id}
				renderItem={({ item }) => <WeaponImage id={item} />}
				numColumns={3}
			/>
		</>
	);
}
