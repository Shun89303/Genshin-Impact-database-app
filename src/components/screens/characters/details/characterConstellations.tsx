import { Constellation } from "@/src/types/character";
import { useState } from "react";
import {
	Dimensions,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import CharacterImageFallback from "./characterImageFallback";

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

const styles = StyleSheet.create({
	tipText: {
		fontSize: 12,
		color: "#1E293B", // dark tip text for light background
		marginBottom: 8,
		textAlign: "center",
	},
	listContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 16,
		alignItems: "center",
	},

	card: {
		borderRadius: 14,
		backgroundColor: "#1E293B",
		paddingVertical: 14,
		paddingHorizontal: 12,
		alignItems: "center",
		gap: 10,
	},

	badge: {
		position: "absolute",
		top: 8,
		left: 8,
		backgroundColor: "#FFD700", // gold color
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
		zIndex: 1,
	},

	badgeText: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#000",
	},

	imageWrapper: {
		backgroundColor: "#0F172A",
		padding: 6,
		borderRadius: 10,
	},

	name: {
		fontSize: 15,
		fontWeight: "600",
		color: "#FFFFFF",
		textAlign: "center",
	},

	pressed: {
		opacity: 0.85,
		transform: [{ scale: 0.97 }],
	},

	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.9)",
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},

	modalCard: {
		borderRadius: 14,
		backgroundColor: "#1E293B",
		padding: 20,
		alignItems: "center",
	},

	modalImage: {
		width: "50%",
		aspectRatio: 1,
		borderRadius: 12,
		marginBottom: 16,
	},

	modalName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFFFFF",
		textAlign: "center",
		marginBottom: 8,
	},

	modalDescription: {
		fontSize: 14,
		color: "#CBD5F5",
		textAlign: "center",
	},
});
