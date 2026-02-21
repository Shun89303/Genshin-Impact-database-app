import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import styles from "../styles.modules";

export default function WeaponImage({ id }: any) {
	const fetchWeaponImageTypes = useWeaponsStore(
		(state) => state.fetchWeaponImageTypes
	);
	const { error } = useWeaponsStore();
	const [url, setUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const weapons = endpoints.weapons;

	useEffect(() => {
		if (!id) return;
		const load = async () => {
			const types: string[] = await fetchWeaponImageTypes(id);
			const imageUrl = `${BASE_URL}${weapons}/${id}/${types[0]}`;
			setUrl(imageUrl);
		};
		load();
	}, [fetchWeaponImageTypes, id, weapons]);

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!url)
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);

	return (
		<>
			<Pressable
				onPress={() =>
					router.push({ pathname: "/weapons/[id]", params: { id } })
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: url }}
					style={{ width: 100, height: 100 }}
					onLoad={() => setLoading(false)}
				/>
			</Pressable>
		</>
	);
}
