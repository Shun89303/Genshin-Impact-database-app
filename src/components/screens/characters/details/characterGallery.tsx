import { endpoints } from "@/src/api/endpoints";
import FallbackImage from "@/src/components/common/FallbackImage";
import TouchDetails from "@/src/components/common/TouchDetails";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";

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
			<TouchDetails />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.container}
			>
				{images.map((uri, idx) => (
					<Pressable key={idx} onPress={() => handlePress(uri)}>
						<View style={[styles.card, { width: cardWidth }]}>
							<FallbackImage
								uri={`${BASE_URL}${characters}/${character.id}/${uri}`}
								style={styles.image}
							/>
						</View>
					</Pressable>
				))}
			</ScrollView>

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
					{selectedImage && (
						<FallbackImage
							uri={`${BASE_URL}${characters}/${character.id}/${selectedImage}`}
							style={styles.modalImage}
						/>
					)}
				</Pressable>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	tipText: {
		fontSize: 12,
		color: "#64748B",
		marginBottom: 8,
		textAlign: "center",
	},

	container: {
		gap: 16,
		alignItems: "center",
	},

	card: {
		borderRadius: 14,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#00000020",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},

	image: {
		width: "100%",
		aspectRatio: 1,
		borderRadius: 10,
	},

	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)", // lighter overlay
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},

	modalImage: {
		width: "90%",
		height: "80%",
		borderRadius: 14,
		backgroundColor: "#F8FAFC", // modal background for contrast
	},
});
