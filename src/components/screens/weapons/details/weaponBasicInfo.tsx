import { Weapon } from "@/src/types/weapon";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WeaponBasicInfo({ weapon }: { weapon: Weapon }) {
	return (
		<View style={styles.container}>
			<Text style={styles.chunkTitle}>Basic Info</Text>

			<Text style={styles.label}>Name:</Text>
			<Text style={styles.value}>{weapon.name}</Text>

			<Text style={styles.label}>Type:</Text>
			<Text style={styles.value}>{weapon.type}</Text>

			<Text style={styles.label}>Rarity:</Text>
			<Text style={styles.value}>{weapon.rarity}★</Text>

			<Text style={styles.label}>Location:</Text>
			<Text style={styles.value}>{weapon.location}</Text>

			<Text style={styles.label}>Ascension Material:</Text>
			<Text style={styles.value}>{weapon.ascensionMaterial}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 24,
		backgroundColor: "#F8FAFC", // light neutral background
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#E6ECF3", // subtle white shade border
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 3,
	},

	chunkTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#1E293B",
		marginBottom: 8,
	},

	label: {
		fontSize: 14,
		fontWeight: "500",
		color: "#64748B",
		marginTop: 6,
	},

	value: {
		fontSize: 16,
		fontWeight: "600",
		color: "#475569",
	},
});
