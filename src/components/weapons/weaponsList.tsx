import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../styles.modules";
import WeaponImage from "./weaponImage";

export default function WeaponsList() {
	const fetchWeaponsIds = useWeaponsStore((state) => state.fetchWeaponsIds);
	const ids = useWeaponsStore((state) => state.ids);
	const { error } = useWeaponsStore();

	useEffect(() => {
		if (!ids || ids.length === 0) {
			fetchWeaponsIds();
			return;
		}

		const remainingIds = ids.slice(20);
		remainingIds.forEach((id) => {
			Image.prefetch(`https://genshin.jmp.blue/weapons/${id}/icon`);
		});
	}, [fetchWeaponsIds, ids]);

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
				numColumns={4}
				initialNumToRender={20}
				windowSize={10}
				removeClippedSubviews
				renderItem={({ item }) => <WeaponImage id={item} />}
			/>
		</>
	);
}
