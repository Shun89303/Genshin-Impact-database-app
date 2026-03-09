import FallbackImage from "@/src/components/common/FallbackImage";
import TouchDetails from "@/src/components/common/TouchDetails";
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
			<TouchDetails />

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
						<View style={styles.badge}>
							<Text style={styles.badgeText}>{`C${index + 1}`}</Text>
						</View>

						<View style={styles.imageWrapper}>
							<FallbackImage
								uri={item.imageUri}
								style={{ width: imageSize, height: imageSize }}
								borderRadius={10}
							/>
						</View>
						<Text style={styles.name}>{item.name}</Text>
					</Pressable>
				))}
			</ScrollView>

			<Modal
				visible={modalVisible}
				transparent
				animationType="fade"
				onRequestClose={closeModal}
			>
				<Pressable style={styles.modalBackground} onPress={closeModal}>
					<View style={[styles.modalCard, { width: screenWidth - 32 }]}>
						<FallbackImage
							uri={items[selectedIndex]?.imageUri}
							style={styles.modalImage}
							borderRadius={12}
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
		color: "#64748B",
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
		backgroundColor: "#FFFFFF", // soft white card
		borderWidth: 1,
		borderColor: "#E6ECF3",
		paddingVertical: 14,
		paddingHorizontal: 12,
		alignItems: "center",
		gap: 10,
	},

	badge: {
		position: "absolute",
		top: 8,
		left: 8,
		backgroundColor: "#FACC15", // softer yellow
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
		zIndex: 1,
	},

	badgeText: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#1E293B",
	},

	imageWrapper: {
		backgroundColor: "#F8FAFC", // soft neutral background
		padding: 6,
		borderRadius: 10,
	},

	name: {
		fontSize: 15,
		fontWeight: "600",
		color: "#1E293B", // dark text
		textAlign: "center",
	},

	pressed: {
		opacity: 0.85,
		transform: [{ scale: 0.97 }],
	},

	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)", // lighter overlay
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},

	modalCard: {
		borderRadius: 14,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#E6ECF3",
		padding: 20,
		alignItems: "center",
	},

	modalImage: {
		width: "50%",
		aspectRatio: 1,
		borderRadius: 12,
		marginBottom: 16,
		backgroundColor: "#F8FAFC",
	},

	modalName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#1E293B",
		textAlign: "center",
		marginBottom: 8,
	},

	modalDescription: {
		fontSize: 14,
		color: "#475569",
		textAlign: "center",
	},
});
