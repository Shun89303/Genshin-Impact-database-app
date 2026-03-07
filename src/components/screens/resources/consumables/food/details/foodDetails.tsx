import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { NormalizedFood } from "@/src/types/food";
import React from "react";
import {
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import FoodImageFallback from "./foodImageFallback";

export default function FoodDetails({
	food,
	refreshing,
	onRefresh,
}: {
	food: NormalizedFood;
	refreshing: boolean;
	onRefresh: () => void;
}) {
	const {
		consumables,
		food: foodEP,
		materials,
		cookingIngredients,
	} = endpoints;

	const buildImageUrl = (id: string) =>
		`${BASE_URL}${consumables}${foodEP}/${id}`;

	function formatForEndpoint(name: string): string {
		return name
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-+|-+$/g, "");
	}

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					colors={["#000000ff"]} // Android
				/>
			}
		>
			<FoodImageFallback
				uri={buildImageUrl(food.id)}
				style={styles.mainImage}
			/>

			{/* Info section */}
			<View style={styles.infoSection}>
				<Text style={styles.label}>Name</Text>
				<Text style={styles.value}>{food.name}</Text>

				<Text style={styles.label}>Type</Text>
				<Text style={styles.value}>{food.type}</Text>

				<Text style={styles.label}>Effect</Text>
				<Text style={styles.value}>{food.effect}</Text>

				<Text style={styles.label}>Description</Text>
				<Text style={styles.value}>{food.description}</Text>

				<Text style={styles.label}>Proficiency</Text>
				<Text style={styles.value}>{food.proficiency}</Text>
			</View>

			{/* Recipe section */}
			{food.recipe && food.recipe.length > 0 && (
				<View style={styles.recipeSection}>
					<Text style={styles.sectionTitle}>Recipe</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.recipeList}
					>
						{food.recipe.map((recipe) => (
							<View key={recipe.item} style={styles.recipeCard}>
								<FoodImageFallback
									uri={`${BASE_URL}${materials}${cookingIngredients}/${formatForEndpoint(
										recipe.item
									)}`}
									style={styles.recipeImage}
								/>
								<Text style={styles.recipeText}>Qty: {recipe.quantity}</Text>
							</View>
						))}
					</ScrollView>
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f8f8",
	},
	content: {
		padding: 16,
	},
	mainImage: {
		width: 120,
		height: 120,
		borderRadius: 12,
		alignSelf: "center",
		marginBottom: 16,
	},
	infoSection: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
	},
	label: {
		fontSize: 13,
		color: "#888",
		marginTop: 8,
	},
	value: {
		fontSize: 15,
		fontWeight: "600",
		color: "#111",
	},
	recipeSection: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 12,
		color: "#111",
	},
	recipeList: {
		paddingHorizontal: 4,
	},
	recipeCard: {
		width: 80,
		marginRight: 12,
		alignItems: "center",
	},
	recipeImage: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginBottom: 4,
	},
	recipeText: {
		fontSize: 12,
		color: "#555",
		textAlign: "center",
	},
});
