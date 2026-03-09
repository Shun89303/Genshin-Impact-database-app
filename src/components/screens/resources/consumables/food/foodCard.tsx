import { endpoints } from "@/src/api/endpoints";
import PressableImage from "@/src/components/common/PressableImage";
import { BASE_URL } from "@/src/config/env";
import { NormalizedFood } from "@/src/types/food";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function FoodCard({ food }: { food: NormalizedFood }) {
	const { consumables, food: foodEP } = endpoints;
	const router = useRouter();

	return (
		<View style={styles.card}>
			<PressableImage
				uri={`${BASE_URL}${consumables}${foodEP}/${food.id}`}
				onPress={() =>
					router.navigate({
						pathname: "/resources/consumables/foods/[id]",
						params: { id: food.id },
					})
				}
				aspectRatio={1}
			/>

			<View style={styles.info}>
				<Text style={styles.label}>Rarity</Text>
				<Text style={styles.value}>{food.rarity}★</Text>

				<Text style={styles.label}>Name</Text>
				<Text style={styles.value}>{food.name}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 150,
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 12,
		margin: 8,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3, // Android shadow
		alignItems: "center",
	},
	info: {
		width: "100%",
	},
	label: {
		fontSize: 12,
		color: "#888",
		marginBottom: 2,
	},
	value: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 6,
		color: "#111",
	},
});
