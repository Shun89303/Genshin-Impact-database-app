import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import { Text, View } from "react-native";
import CharacterImageFallback from "./characterImageFallback";
import styles from "./styles/characterOverview.styles";

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
