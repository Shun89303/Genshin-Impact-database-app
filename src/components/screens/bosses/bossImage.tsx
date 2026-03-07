import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { useBossesStore } from "@/src/store/useBossesStore";
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
import styles from "../../styles.modules";

export default function BossImage({ id }: { id: string }) {
	const { error } = useBossesStore();
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const boss = endpoints.boss;
	const weeklyBoss = endpoints.weeklyBoss;
	const icon = endpoints.icon;

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);
	}

	return (
		<Pressable
			style={({ pressed }) => [
				localStyles.container,
				pressed && localStyles.pressed,
			]}
			onPress={() =>
				router.navigate({ pathname: "/bosses/[id]", params: { id } })
			}
		>
			<View style={localStyles.imageWrapper}>
				{loading && (
					<View style={localStyles.loader}>
						<ActivityIndicator size="small" color="#E2E8F0" />
					</View>
				)}

				<Image
					source={{ uri: `${BASE_URL}${boss}${weeklyBoss}/${id}${icon}` }}
					style={localStyles.image}
					cachePolicy="memory-disk"
					contentFit="contain"
					onLoad={() => setLoading(false)}
				/>
			</View>
		</Pressable>
	);
}

const localStyles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		padding: 6,
	},

	pressed: {
		opacity: 0.7,
	},

	imageWrapper: {
		width: 100,
		height: 100,
		borderRadius: 12,
		backgroundColor: "#1E293B",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#334155",
		overflow: "hidden",
	},

	image: {
		width: "100%",
		height: "100%",
	},

	loader: {
		position: "absolute",
		zIndex: 1,
	},
});
