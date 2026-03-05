import { Weapon } from "@/src/types/weapon";
import React from "react";
import { Text, View } from "react-native";
import styles from "./styles/weaponBasicInfo.styles";

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
