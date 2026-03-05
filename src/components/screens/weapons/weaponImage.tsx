import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function WeaponImage({ id }: { id: string }) {
	const { error } = useWeaponsStore();
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const weapons = endpoints.weapons;
	const icon = endpoints.icon;

	if (error)
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);

	return (
		<Pressable
			onPress={() => router.push({ pathname: "/weapons/[id]", params: { id } })}
			style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
		>
			{loading && (
				<View style={styles.loaderOverlay}>
					<ActivityIndicator size="small" color="#FFFFFF" />
				</View>
			)}
			<Image
				source={{ uri: `${BASE_URL}${weapons}/${id}${icon}` }}
				style={styles.image}
				cachePolicy="memory-disk"
				onLoad={() => setLoading(false)}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 100,
		height: 100,
		margin: 4,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#1E293B",
		justifyContent: "center",
		alignItems: "center",
	},

	cardPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.97 }],
	},

	image: {
		width: "100%",
		height: "100%",
	},

	loaderOverlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.3)",
		zIndex: 1,
	},

	errorContainer: {
		width: 100,
		height: 100,
		margin: 4,
		borderRadius: 12,
		backgroundColor: "#7F1D1D",
		justifyContent: "center",
		alignItems: "center",
		padding: 4,
	},

	errorText: {
		color: "#FFF",
		fontSize: 12,
		textAlign: "center",
	},
});
