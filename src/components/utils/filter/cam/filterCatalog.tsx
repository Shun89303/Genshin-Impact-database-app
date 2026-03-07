import { useCharacterAscensionMaterialsStore } from "@/src/store/useCharacterAscensionStore";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FilterCatalog({ sheetRef }: { sheetRef: any }) {
	const selectedType = useCharacterAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const setSelectedType = useCharacterAscensionMaterialsStore(
		(state) => state.setSelectedType
	);

	interface Category {
		key: "element" | null;
		label: string;
	}

	const categories: Category[] = [
		{ key: "element", label: "Element" },
		{ key: null, label: "None" },
	];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Category</Text>
			<View style={styles.buttonRow}>
				{categories.map((cat) => {
					const isActive = selectedType === cat.key;
					return (
						<Pressable
							key={String(cat.key)}
							style={[
								styles.button,
								isActive
									? styles.activeButton
									: cat.key === null
									? styles.noneButton
									: null,
							]}
							onPress={() => setSelectedType(cat.key, sheetRef)}
						>
							<Text
								style={[
									styles.buttonText,
									isActive
										? styles.activeButtonText
										: cat.key === null
										? styles.noneButtonText
										: null,
								]}
							>
								{cat.label}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		paddingHorizontal: 24,
		gap: 20,
	},
	title: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 18,
		color: "#333",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		gap: 12,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 24,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 3,
		elevation: 3,
		backgroundColor: "#f1f1f1",
	},
	buttonText: {
		fontWeight: "600",
		fontSize: 16,
		color: "#333",
	},
	activeButton: {
		backgroundColor: "#4f46e5",
	},
	activeButtonText: {
		color: "#fff",
	},
	noneButton: {
		backgroundColor: "#e0e0e0",
	},
	noneButtonText: {
		color: "#333",
	},
});
