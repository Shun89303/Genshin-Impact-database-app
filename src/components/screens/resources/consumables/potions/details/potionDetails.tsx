import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { NormalizedPotion } from "@/src/types/potion";
import React from "react";
import {
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useColorScheme,
} from "react-native";
import PotionImageFallback from "./potionImageFallback";

export default function PotionDetails({
	potion,
	refreshing,
	onRefresh,
}: {
	potion: NormalizedPotion;
	refreshing: boolean;
	onRefresh: () => void;
}) {
	const { consumables, potions: potionsEP } = endpoints;
	const colorScheme = useColorScheme();

	const buildImageUrl = (id: string) =>
		`${BASE_URL}${consumables}${potionsEP}/${id}`;

	const bgColor = colorScheme === "dark" ? "#1E293B" : "#F8F8F8";
	const cardColor = colorScheme === "dark" ? "#111827" : "#fff";
	const textColor = colorScheme === "dark" ? "#F9FAFB" : "#111";

	return (
		<View style={[styles.container, { backgroundColor: bgColor }]}>
			<PotionImageFallback
				uri={buildImageUrl(potion.id)}
				style={styles.mainImage}
			/>
			<ScrollView
				contentContainerStyle={styles.content}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				{/* Info Section */}
				<View style={[styles.infoSection, { backgroundColor: cardColor }]}>
					<Text style={styles.label}>Name</Text>
					<Text style={[styles.value, { color: textColor }]}>
						{potion.name}
					</Text>

					<Text style={styles.label}>Rarity</Text>
					<Text style={[styles.value, { color: textColor }]}>
						{potion.rarity}★
					</Text>

					<Text style={styles.label}>Effect</Text>
					<Text style={[styles.value, { color: textColor }]}>
						{potion.effect}
					</Text>
				</View>

				{/* Crafting Section */}
				<View style={styles.craftingSection}>
					<Text style={[styles.sectionTitle, { color: textColor }]}>
						Crafting
					</Text>
					<View style={styles.craftingList}>
						{potion.crafting.map((craft) => (
							<View
								key={craft.item}
								style={[styles.craftingCard, { backgroundColor: cardColor }]}
							>
								<Text style={[styles.craftingLabel, { color: "#888" }]}>
									Item
								</Text>
								<Text style={[styles.craftingValue, { color: textColor }]}>
									{craft.item}
								</Text>

								<Text style={[styles.craftingLabel, { color: "#888" }]}>
									Quantity
								</Text>
								<Text style={[styles.craftingValue, { color: textColor }]}>
									{craft.quantity}
								</Text>
							</View>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingHorizontal: 16,
		paddingBottom: 24,
	},
	mainImage: {
		width: 120,
		height: 120,
		borderRadius: 12,
		alignSelf: "center",
		marginBottom: 16,
	},
	infoSection: {
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
		gap: 8,
	},
	label: {
		fontSize: 13,
		color: "#888",
		marginTop: 8,
	},
	value: {
		fontSize: 15,
		fontWeight: "600",
	},
	craftingSection: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 12,
	},
	craftingList: {
		gap: 12,
	},
	craftingCard: {
		borderRadius: 12,
		padding: 12,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 3,
		elevation: 1,
	},
	craftingLabel: {
		fontSize: 12,
		marginTop: 4,
	},
	craftingValue: {
		fontSize: 14,
		fontWeight: "600",
	},
});
