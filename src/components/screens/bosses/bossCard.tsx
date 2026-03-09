import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Boss } from "@/src/types/boss";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import PressableImage from "../../common/PressableImage";

export default function BossCard({ boss }: { boss: Boss }) {
	const { boss: bossEP, weeklyBoss, icon } = endpoints;
	const router = useRouter();

	return (
		<View style={styles.card}>
			<View style={styles.imageWrapper}>
				<PressableImage
					uri={`${BASE_URL}${bossEP}${weeklyBoss}/${boss.id}${icon}`}
					onPress={() =>
						router.navigate({
							pathname: "/bosses/[id]",
							params: { id: boss.id },
						})
					}
					width={150}
					aspectRatio={1}
					imageStyle={{
						borderColor: "#475569",
					}}
				/>
			</View>

			<View style={styles.content}>
				<Text style={styles.label}>Name</Text>
				<Text style={styles.name}>{boss.name}</Text>

				<Text style={styles.label}>Description</Text>
				<Text style={styles.description}>{boss.description}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#F8FAFC", // light neutral background
		borderRadius: 14,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#334155",
	},

	imageWrapper: {
		alignItems: "center",
		marginBottom: 12,
	},

	content: {
		gap: 4,
	},

	label: {
		fontSize: 12,
		color: "#1E293B",
		textTransform: "uppercase",
		marginTop: 6,
	},

	name: {
		fontSize: 18,
		fontWeight: "600",
		color: "#64748B",
		marginBottom: 6,
	},

	description: {
		fontSize: 14,
		lineHeight: 20,
		color: "#475569",
	},
});
