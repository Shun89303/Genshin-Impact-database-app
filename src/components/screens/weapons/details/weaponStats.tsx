import { Weapon } from "@/src/types/weapon";
import React from "react";
import { Text, View } from "react-native";
import styles from "./styles/weaponStats.styles";

export default function WeaponStats({ weapon }: { weapon: Weapon }) {
	return (
		<View style={styles.container}>
			<Text style={styles.chunkTitle}>Stats & Passive</Text>

			<Text style={styles.label}>Base Attack:</Text>
			<Text style={styles.value}>{weapon.baseAttack}</Text>

			<Text style={styles.label}>Sub Stat:</Text>
			<Text style={styles.value}>{weapon.subStat}</Text>

			<Text style={styles.label}>Passive Name:</Text>
			<Text style={styles.value}>{weapon.passiveName}</Text>

			<Text style={styles.label}>Passive Description:</Text>
			<Text style={styles.value}>{weapon.passiveDesc}</Text>
		</View>
	);
}
