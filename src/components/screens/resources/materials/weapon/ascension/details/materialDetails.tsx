import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Normalized } from "@/src/types/weapon.ascension.material";
import React from "react";
import {
	FlatList,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useColorScheme,
} from "react-native";
import MaterialImageFallback from "./materialImageFallback";

interface Props {
	material: Normalized;
	refreshing: boolean;
	onRefresh: () => void;
}

export default function MaterialDetails({
	material,
	refreshing,
	onRefresh,
}: Props) {
	const { materials, weaponAscension, weapons, icon } = endpoints;
	const colorScheme = useColorScheme();
	const bgColor = colorScheme === "dark" ? "#1E293B" : "#F8F8F8";

	const buildImageUrl = (id: string) =>
		`${BASE_URL}${materials}${weaponAscension}/${id}`;

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: bgColor }]}
			contentContainerStyle={styles.content}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			{/* Material Items in 2x2 grid using flexWrap */}
			<View style={styles.gridContainer}>
				{material.items.map((item) => (
					<View key={item.id} style={styles.gridItem}>
						<MaterialImageFallback
							uri={buildImageUrl(item.id)}
							style={styles.mainImage}
						/>

						<Text style={styles.label}>Rarity</Text>
						<Text style={styles.value}>{"★".repeat(item.rarity)}</Text>

						<Text style={styles.label}>Name</Text>
						<Text style={styles.value}>{item.name}</Text>
					</View>
				))}
			</View>

			{/* Availability & Source combined */}
			<View style={styles.infoSection}>
				{material.availability.length > 0 && (
					<>
						<Text style={styles.label}>Availability</Text>
						<Text style={styles.value}>{material.availability.join(", ")}</Text>
					</>
				)}
				<Text style={styles.label}>Source</Text>
				<Text style={styles.value}>{material.source}</Text>
			</View>

			{/* Related Weapons */}
			{material.weapons.length > 0 && (
				<View style={styles.craftingSection}>
					<Text style={styles.sectionTitle}>Related Weapons</Text>
					<FlatList
						data={material.weapons}
						keyExtractor={(weaId) => weaId}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ gap: 12 }}
						renderItem={({ item: weaId }) => (
							<MaterialImageFallback
								uri={`${BASE_URL}${weapons}/${weaId}${icon}`}
								style={styles.weaponImage}
							/>
						)}
					/>
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 12,
	},
	content: {
		paddingHorizontal: 16,
		paddingBottom: 24,
		gap: 16,
	},

	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: 12, // optional spacing between items
	},

	gridItem: {
		width: "48%", // 2 items per row with spacing
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 12,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
		alignItems: "center",
	},

	mainImage: {
		width: 120,
		height: 120,
		borderRadius: 12,
		alignSelf: "center",
		marginBottom: 12,
	},

	infoSection: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
		gap: 10,
	},

	label: {
		fontSize: 13,
		color: "#64748b",
	},
	value: {
		fontSize: 15,
		fontWeight: "600",
		color: "#1e293b",
	},

	craftingSection: {
		marginTop: 16,
	},

	sectionTitle: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 12,
		color: "#64748b",
	},

	weaponImage: {
		width: 100,
		height: 100,
		borderRadius: 12,
		backgroundColor: "#f1f5f9",
	},
});
