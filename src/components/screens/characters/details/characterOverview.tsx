import { endpoints } from "@/src/api/endpoints";
import FallbackImage from "@/src/components/common/FallbackImage";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import { StyleSheet, Text, View } from "react-native";

export default function CharacterOverview({
	character,
	screenWidth,
}: {
	character: Character;
	screenWidth: number;
}) {
	const { characters, portrait } = endpoints;

	return (
		<View style={styles.container}>
			{/* Portrait */}
			<FallbackImage
				uri={`${BASE_URL}${endpoints.characters}/${character.id}${portrait}`}
				style={{ width: 150, height: 240, borderRadius: 16 }}
			/>

			{/* Text Info */}
			<View style={styles.textSection}>
				<Text style={styles.name}>{character.name}</Text>
				<Text style={styles.title}>{character.title}</Text>
				<Text style={styles.description}>{character.description}</Text>
			</View>

			{/* Icons Row */}
			<View style={styles.iconRow}>
				<FallbackImage
					uri={`${BASE_URL}${characters}/${character.id}/${character.images.icon}`}
					style={{ width: 50, height: 50, borderRadius: 16 }}
				/>
				<FallbackImage
					uri={`${BASE_URL}${characters}/${character.id}/${character.images.iconBig}`}
					style={{ width: 50, height: 50, borderRadius: 16 }}
				/>
				<FallbackImage
					uri={`${BASE_URL}${characters}/${character.id}/${character.images.iconSide}`}
					style={{ width: 50, height: 50, borderRadius: 16 }}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingHorizontal: 24,
		paddingVertical: 28,
		gap: 20,
		backgroundColor: "#F8FAFC", // light neutral background
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#E6ECF3", // subtle white shade border
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 3,
	},

	textSection: {
		alignItems: "center",
		gap: 6,
		maxWidth: 600,
	},

	name: {
		fontSize: 28,
		fontWeight: "700",
		color: "#1E293B",
	},

	title: {
		fontSize: 16,
		fontStyle: "italic",
		color: "#64748B",
	},

	description: {
		marginTop: 8,
		fontSize: 15,
		lineHeight: 22,
		color: "#475569",
		textAlign: "center",
	},

	iconRow: {
		flexDirection: "row",
		gap: 16,
		marginTop: 12,
	},

	icon: {
		width: 44,
		height: 44,
		borderRadius: 10,
		backgroundColor: "#FFFFFF", // soft white background for icons
		padding: 4,
		borderWidth: 1,
		borderColor: "#E6ECF3",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
});
