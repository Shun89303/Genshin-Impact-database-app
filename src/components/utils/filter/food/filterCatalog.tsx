import { useFoodStore } from "@/src/store/useFood.consumables.store";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FilterCatalog({ sheetRef }: { sheetRef: any }) {
	const selectedType = useFoodStore((state) => state.selectedType);
	const setSelectedType = useFoodStore((state) => state.setSelectedType);

	const filters: ("type" | "rarity" | null)[] = ["type", "rarity", null];

	const getLabel = (filter: string | null) => {
		if (filter === "type") return "Type";
		if (filter === "rarity") return "Rarity";
		return "None";
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Category</Text>

			<View style={styles.buttonRow}>
				{filters.map((filter) => {
					const isSelected = selectedType === filter;
					return (
						<Pressable
							key={filter ?? "none"}
							style={[styles.button, isSelected && styles.buttonSelected]}
							onPress={() => setSelectedType(filter, sheetRef)}
						>
							<Text
								style={[
									styles.buttonText,
									isSelected && styles.buttonTextSelected,
								]}
							>
								{getLabel(filter)}
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
		paddingVertical: 20,
		paddingHorizontal: 16,
		gap: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		textAlign: "center",
		color: "#111",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	button: {
		backgroundColor: "#e0e0ff",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 10,
		elevation: 2,
	},
	buttonSelected: {
		backgroundColor: "#4f46e5",
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#4f46e5",
	},
	buttonTextSelected: {
		color: "#fff",
	},
});
