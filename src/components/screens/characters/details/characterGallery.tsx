import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import CharacterImageFallback from "./characterImageFallback";
import styles from "./styles/characterGallery.styles";

export default function CharacterGallery({
	character,
	cardWidth,
}: {
	character: Character;
	cardWidth: number;
}) {
	const { characters } = endpoints;
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string>("");

	const images = [
		character.images.card,
		character.images.gachaCard,
		character.images.gachaSplash,
		character.images.namecardBackground,
	];

	const handlePress = (uri: string) => {
		setSelectedImage(uri);
		setModalVisible(true);
	};

	return (
		<>
			<Text style={styles.tipText}>Tap an image to enlarge</Text>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.container}
			>
				{images.map((uri, idx) => (
					<Pressable key={idx} onPress={() => handlePress(uri)}>
						<View style={[styles.card, { width: cardWidth }]}>
							<CharacterImageFallback
								uri={`${BASE_URL}${characters}/${character.id}/${uri}`}
								style={styles.image}
							/>
						</View>
					</Pressable>
				))}
			</ScrollView>

			{/* Modal for full-screen view */}
			<Modal
				visible={modalVisible}
				transparent
				animationType="fade"
				onRequestClose={() => setModalVisible(false)}
			>
				<Pressable
					style={styles.modalContainer}
					onPress={() => setModalVisible(false)}
				>
					{selectedImage ? (
						<CharacterImageFallback
							uri={`${BASE_URL}${characters}/${character.id}/${selectedImage}`}
							style={styles.modalImage}
						/>
					) : null}
				</Pressable>
			</Modal>
		</>
	);
}
