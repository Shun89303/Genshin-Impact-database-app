import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import { StyleSheet, Text, View } from "react-native";
import CharacterImageFallback from "./characterImageFallback";

export default function CharacterOverview({
	character,
	screenWidth,
}: {
	character: Character;
	screenWidth: number;
}) {
	const { characters } = endpoints;

	return (
		<View style={styles.container}>
			<CharacterImageFallback
				uri={`${BASE_URL}${characters}/${character.id}/${character.images.portrait}`}
				style={{ width: screenWidth * 0.65, height: screenWidth * 0.65 }}
			/>

			<View style={styles.textSection}>
				<Text style={styles.name}>{character.name}</Text>
				<Text style={styles.title}>{character.title}</Text>
				<Text style={styles.description}>{character.description}</Text>
			</View>

			<View style={styles.iconRow}>
				<CharacterImageFallback
					uri={`${BASE_URL}${characters}/${character.id}/${character.images.icon}`}
					style={styles.icon}
				/>
				<CharacterImageFallback
					uri={`${BASE_URL}${characters}/${character.id}/${character.images.iconBig}`}
					style={styles.icon}
				/>
				<CharacterImageFallback
					uri={`${BASE_URL}${characters}/${character.id}/${character.images.iconSide}`}
					style={styles.icon}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 24,
		gap: 18,
		backgroundColor: "#0F172A",
		borderRadius: 18,
	},

	textSection: {
		alignItems: "center",
		gap: 6,
		maxWidth: 600,
	},

	name: {
		fontSize: 26,
		fontWeight: "700",
		color: "#FFFFFF",
	},

	title: {
		fontSize: 16,
		fontStyle: "italic",
		color: "#94A3B8",
	},

	description: {
		marginTop: 8,
		fontSize: 15,
		lineHeight: 22,
		color: "#CBD5F5",
		textAlign: "center",
	},

	iconRow: {
		flexDirection: "row",
		gap: 14,
		marginTop: 8,
	},

	icon: {
		width: 42,
		height: 42,
		borderRadius: 8,
		backgroundColor: "#1E293B",
		padding: 4,
	},
});
