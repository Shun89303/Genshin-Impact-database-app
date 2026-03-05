import { Constellation } from "@/src/types/character";
import { useState } from "react";
import {
	Dimensions,
	Modal,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import CharacterImageFallback from "./characterImageFallback";
import styles from "./styles/characterConstellations.styles";

type ConstellationItem = {
	name: string;
	description: string;
	imageUri: string;
};

export default function CharacterConstellations({
	data,
	imageUris,
	renderImageUri,
	cardWidth,
	imageSize,
}: {
	data: Constellation[];
	imageUris: string[];
	renderImageUri: (uri: string) => string;
	cardWidth: number;
	imageSize: number;
}) {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const screenWidth = Dimensions.get("window").width;

	// Map to common ConstellationItem type
	const items: ConstellationItem[] = data.map((item, idx) => ({
		name: item.name,
		description: item.description,
		imageUri: renderImageUri(imageUris[idx]),
	}));

	const openModal = (index: number) => {
		setSelectedIndex(index);
		setModalVisible(true);
	};

	const closeModal = () => setModalVisible(false);

	return (
		<>
			<Text style={styles.tipText}>Tap a constellation to view details</Text>
			{/* Vertical scrollable list */}
			<ScrollView
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
			>
				{items.map((item, index) => (
					<Pressable
						key={item.name}
						onPress={() => openModal(index)}
						style={({ pressed }) => [
							styles.card,
							{ width: cardWidth },
							pressed && styles.pressed,
						]}
					>
						{/* Badge for C1, C2, ... */}
						<View style={styles.badge}>
							<Text style={styles.badgeText}>{`C${index + 1}`}</Text>
						</View>

						<View style={styles.imageWrapper}>
							<CharacterImageFallback
								uri={item.imageUri}
								style={{ width: imageSize, height: imageSize }}
							/>
						</View>
						<Text style={styles.name}>{item.name}</Text>
					</Pressable>
				))}
			</ScrollView>

			{/* Modal for single item */}
			<Modal
				visible={modalVisible}
				transparent
				animationType="fade"
				onRequestClose={closeModal}
			>
				<Pressable style={styles.modalBackground} onPress={closeModal}>
					<View style={[styles.modalCard, { width: screenWidth - 32 }]}>
						<CharacterImageFallback
							uri={items[selectedIndex]?.imageUri}
							style={styles.modalImage}
						/>
						<Text style={styles.modalName}>{items[selectedIndex]?.name}</Text>
						<Text style={styles.modalDescription}>
							{items[selectedIndex]?.description}
						</Text>
					</View>
				</Pressable>
			</Modal>
		</>
	);
}
