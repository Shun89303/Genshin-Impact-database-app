import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useNationsStore } from "@/src/store/useNationsStore";
import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../styles.modules";
import NationImage from "./nationImage";

export default function NationsList() {
	const fetchNationsIds = useNationsStore((state) => state.fetchNationsIds);
	const ids = useNationsStore((state) => state.ids);
	const { error } = useNationsStore();
	const nations = endpoints.nations;
	const icon = endpoints.icon;

	useEffect(() => {
		if (!ids || ids.length === 0) {
			fetchNationsIds();
			return;
		}

		const remainingIds = ids.slice(10);
		remainingIds.forEach((id) => {
			Image.prefetch(`${BASE_URL}${nations}/${id}${icon}`);
		});
	}, [fetchNationsIds, ids, nations, icon]);

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
				numColumns={3}
				initialNumToRender={9}
				windowSize={20}
				removeClippedSubviews
				renderItem={({ item }) => <NationImage id={item} />}
			/>
		</>
	);
}
