import { Normalized } from "@/src/types/talent.book";
import React from "react";
import {
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import CharacterImage from "./characterImage";
import MaterialsImageFallback from "./materialImageFallback";

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
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ paddingBottom: 24 }}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					colors={["#3B82F6"]} // Android
				/>
			}
		>
			<Text style={styles.title}>{material.id}</Text>

			{/* Material Items */}
			{material.items && material.items.length > 0 && (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.horizontalScroll}
				>
					{material.items.map((item) => (
						<View key={item.id} style={styles.itemContainer}>
							<MaterialsImageFallback id={item.id} />
							<Text style={styles.itemRarity}>{"★".repeat(item.rarity)}</Text>
						</View>
					))}
				</ScrollView>
			)}

			{/* Characters */}
			{material.characters && material.characters.length > 0 && (
				<View style={styles.charactersContainer}>
					<Text style={styles.sectionTitle}>Characters</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.horizontalScroll}
					>
						{material.characters.map((chaId) => (
							<View key={chaId} style={styles.characterContainer}>
								<CharacterImage id={chaId} />
							</View>
						))}
					</ScrollView>
				</View>
			)}

			<View style={styles.infoContainer}>
				{/* Availability */}
				{material.availability.length > 0 && (
					<Text style={styles.infoText}>
						Availability: {material.availability.join(", ")}
					</Text>
				)}

				{/* Source */}
				<Text style={styles.infoText}>Source: {material.source}</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 16,
		backgroundColor: "#F8FAFC",
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		color: "#1E293B",
		marginBottom: 12,
		textAlign: "center",
		textTransform: "capitalize",
	},
	sectionTitle: {
		marginTop: 16,
		marginBottom: 8,
		fontWeight: "500",
		fontSize: 16,
		color: "#334155",
		textAlign: "center",
	},
	charactersContainer: {
		marginTop: 16,
		padding: 12,
		borderRadius: 12,
		backgroundColor: "#F1F5F9", // light neutral background
		borderWidth: 1,
		borderColor: "#E2E8F0", // subtle border
	},
	horizontalScroll: {
		paddingHorizontal: 4,
	},
	itemContainer: {
		alignItems: "center",
		marginRight: 12,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderRadius: 8,
		backgroundColor: "#F1F5F9", // light neutral background
	},
	itemImage: {
		width: 50,
		height: 50,
		borderRadius: 8,
		backgroundColor: "#E5E7EB",
	},
	itemRarity: {
		fontSize: 12,
		marginTop: 4,
		marginLeft: 5,
		color: "#475569",
	},
	characterContainer: {
		marginRight: 12,
		borderRadius: 8,
		overflow: "hidden",
	},
	infoContainer: {
		marginTop: 16,
		padding: 12,
		borderRadius: 12,
		backgroundColor: "#F1F5F9", // light neutral background
		borderWidth: 1,
		borderColor: "#E2E8F0", // subtle border for separation
	},
	infoText: {
		fontSize: 14,
		color: "#475569",
		marginBottom: 4,
	},
});
