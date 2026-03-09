import { endpoints } from "@/src/api/endpoints";
import Divider from "@/src/components/common/Divider";
import FallbackImage from "@/src/components/common/FallbackImage";
import { BASE_URL } from "@/src/config/env";
import { Boss } from "@/src/types/boss";
import React from "react";
import {
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function BossDetails({
	boss,
	refreshing,
	onRefresh,
}: {
	boss: Boss;
	refreshing: boolean;
	onRefresh: () => void;
}) {
	const {
		boss: bossEndpoint,
		weeklyBoss,
		portrait,
		artifacts,
		circletOfLogos,
	} = endpoints;

	const bossImageUrl = `${BASE_URL}${bossEndpoint}${weeklyBoss}/${boss.id}${portrait}`;

	function toSlug(name: string): string {
		return name
			.trim()
			.toLowerCase()
			.replace(/'/g, " ")
			.split(/\s+/)
			.filter(Boolean)
			.join("-");
	}

	return (
		<View style={styles.container}>
			{/* Boss Portrait */}
			<View style={styles.portraitWrapper}>
				<FallbackImage
					uri={bossImageUrl}
					style={styles.portrait}
					borderColor="#475569"
				/>
				<Text style={styles.bossName}>{boss.name}</Text>
			</View>

			<Divider />

			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ paddingBottom: 24 }}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={["#000000ff"]} // Android
					/>
				}
			>
				{/* Drops */}
				<Text style={styles.sectionTitle}>Drops</Text>

				<View style={styles.dropsContainer}>
					{boss.drops.map((drop) => (
						<View key={drop.name} style={styles.dropRow}>
							<FallbackImage
								uri={`${BASE_URL}${bossEndpoint}${weeklyBoss}/${
									boss.id
								}/${toSlug(drop.name)}`}
								style={styles.dropImage}
								borderColor="#334155"
							/>
							<View style={styles.dropInfo}>
								<Text style={styles.label}>Name</Text>
								<Text style={styles.value}>{drop.name}</Text>

								<Text style={styles.label}>Rarity</Text>
								<Text style={styles.value}>{drop.rarity}★</Text>

								<Text style={styles.label}>Source</Text>
								<Text style={styles.source}>{drop.source}</Text>
							</View>
						</View>
					))}
				</View>

				<Divider />

				{/* Artifacts */}
				<Text style={styles.sectionTitle}>Artifacts</Text>
				<View>
					{/* First row: first 3 artifacts */}
					<View style={styles.artifactRow}>
						{boss.artifacts.slice(0, 3).map((art) => (
							<View key={art.name} style={styles.artifactCard}>
								<FallbackImage
									uri={`${BASE_URL}${artifacts}/${toSlug(
										art.name
									)}${circletOfLogos}`}
									style={styles.artifactImage}
									borderColor="#334155"
								/>
								<Text style={styles.artifactName}>{art.name}</Text>
							</View>
						))}
					</View>

					{/* Second row: remaining artifacts, centered */}
					<View style={[styles.artifactRow, styles.centerRow]}>
						{boss.artifacts.slice(3).map((art) => (
							<View key={art.name} style={styles.artifactCard}>
								<FallbackImage
									uri={`${BASE_URL}${artifacts}/${toSlug(
										art.name
									)}${circletOfLogos}`}
									style={styles.artifactImage}
									borderColor="#334155"
								/>
								<Text style={styles.artifactName}>{art.name}</Text>
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
		paddingHorizontal: 16,
		backgroundColor: "#F8FAFC",
	},

	portraitWrapper: {
		alignItems: "center",
		marginVertical: 16,
	},

	portrait: {
		width: 140,
		height: 140,
		marginBottom: 8,
	},

	bossName: {
		fontSize: 20,
		fontWeight: "700",
		color: "#1E293B",
	},

	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1E293B",
		marginVertical: 12,
	},

	dropsContainer: {
		gap: 12,
	},

	dropRow: {
		flexDirection: "row",
		backgroundColor: "#F8FAFC", // light neutral background
		borderRadius: 12,
		padding: 12,
		borderWidth: 1,
		borderColor: "#334155",
	},

	dropImage: {
		width: 80,
		height: 80,
		marginRight: 12,
		borderRadius: 8,
		alignSelf: "center",
	},

	dropInfo: {
		flex: 1,
		justifyContent: "space-around",
	},

	label: {
		fontSize: 11,
		fontWeight: "600",
		color: "#1E293B",
		textTransform: "uppercase",
	},

	value: {
		fontSize: 14,
		color: "#64748B",
	},

	source: {
		fontSize: 13,
		color: "#64748B",
	},

	divider: {
		height: 1,
		backgroundColor: "#334155",
		marginVertical: 16,
	},

	artifactRow: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 12,
		marginBottom: 12,
	},

	centerRow: {
		justifyContent: "center", // center second row
	},

	artifactCard: {
		width: 100,
		alignItems: "center",
		backgroundColor: "#F8FAFC", // light neutral background
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#334155",
	},

	artifactImage: {
		width: 70,
		height: 70,
		marginBottom: 6,
	},

	artifactName: {
		fontSize: 12,
		color: "#1E293B",
		textAlign: "center",
	},
});
