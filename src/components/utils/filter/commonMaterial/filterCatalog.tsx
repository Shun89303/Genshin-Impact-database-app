import { useCommonAscensionMaterialsStore } from "@/src/store/useCommonAscensionStore";
import { Pressable, StyleSheet, Text, View } from "react-native";

type FilterType = "rarity" | null;

export default function FilterCatalog({ sheetRef }: { sheetRef: any }) {
	const selectedType = useCommonAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const setSelectedType = useCommonAscensionMaterialsStore(
		(state) => state.setSelectedType
	);

	const buttons: { label: string; type: FilterType }[] = [
		{ label: "Rarity", type: "rarity" },
		{ label: "None", type: null },
	];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Category</Text>
			<View style={styles.buttonsRow}>
				{buttons.map((btn) => {
					const isActive = selectedType === btn.type;
					return (
						<Pressable
							key={btn.label}
							onPress={() => setSelectedType(btn.type, sheetRef)}
							style={[styles.button, isActive && styles.activeButton]}
						>
							<Text
								style={[styles.buttonText, isActive && styles.activeButtonText]}
							>
								{btn.label}
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
		gap: 24,
		paddingVertical: 16,
		paddingHorizontal: 20,
		backgroundColor: "#F9F9F9",
		borderRadius: 12,
	},
	title: {
		textAlign: "center",
		fontWeight: "700",
		fontSize: 16,
		color: "#333",
	},
	buttonsRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	button: {
		backgroundColor: "#E0E0E0",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#CCC",
	},
	activeButton: {
		backgroundColor: "#D0D0D0",
		borderColor: "#999",
	},
	buttonText: {
		color: "#333",
		fontWeight: "500",
	},
	activeButtonText: {
		fontWeight: "700",
		color: "#111",
	},
});
