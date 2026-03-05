import { Artifact } from "@/src/types/artifact";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ArtifactDetailsInfo({
	artifact,
}: {
	artifact: Artifact;
}) {
	return (
		<View style={styles.container}>
			<Text style={styles.name}>{artifact.name}</Text>
			<Text style={styles.rarity}>Max Rarity: ★{artifact.max_rarity}</Text>

			<View style={styles.divider} />

			{"1-piece_bonus" in artifact && (
				<View style={styles.bonusBlock}>
					<Text style={styles.bonusTitle}>1-Piece Bonus</Text>
					<Text style={styles.bonusText}>{artifact["1-piece_bonus"]}</Text>
				</View>
			)}

			{"2-piece_bonus" in artifact && (
				<View style={styles.bonusBlock}>
					<Text style={styles.bonusTitle}>2-Piece Bonus</Text>
					<Text style={styles.bonusText}>{artifact["2-piece_bonus"]}</Text>
				</View>
			)}

			{"4-piece_bonus" in artifact && (
				<View style={styles.bonusBlock}>
					<Text style={styles.bonusTitle}>4-Piece Bonus</Text>
					<Text style={styles.bonusText}>{artifact["4-piece_bonus"]}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 8,
	},

	name: {
		fontSize: 22,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
		marginBottom: 4,
	},

	rarity: {
		fontSize: 14,
		color: "#94A3B8",
		textAlign: "center",
		marginBottom: 12,
	},

	divider: {
		height: 1,
		backgroundColor: "#334155",
		marginBottom: 12,
	},

	bonusBlock: {
		marginBottom: 12,
	},

	bonusTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#E2E8F0",
		marginBottom: 4,
	},

	bonusText: {
		fontSize: 14,
		color: "#CBD5F5",
		lineHeight: 20,
	},
});
