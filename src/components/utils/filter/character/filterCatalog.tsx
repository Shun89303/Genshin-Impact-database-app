import { useCharactersStore } from "@/src/store/useCharactersStore";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FilterCatalog({ sheetRef }: { sheetRef: any }) {
	const selectedType = useCharactersStore((state) => state.selectedType);
	const setSelectedType = useCharactersStore((state) => state.setSelectedType);

	type CharacterFilterType = "vision" | "weapon" | "nation" | null;

	const options: { label: string; value: CharacterFilterType }[] = [
		{ label: "Vision", value: "vision" },
		{ label: "Weapon", value: "weapon" },
		{ label: "Nation", value: "nation" },
		{ label: "None", value: null },
	];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Category</Text>

			<View style={styles.grid}>
				{options.map((item) => {
					const isActive = selectedType === item.value;

					return (
						<Pressable
							key={item.label}
							onPress={() => setSelectedType(item.value, sheetRef)}
							style={({ pressed }) => [
								styles.option,
								isActive && styles.activeOption,
								pressed && styles.pressed,
							]}
						>
							<Text style={[styles.optionText, isActive && styles.activeText]}>
								{item.label}
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
		paddingVertical: 24,
		gap: 24,
	},

	title: {
		fontSize: 18,
		fontWeight: "700",
		textAlign: "center",
		color: "#FFFFFF",
	},

	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},

	option: {
		width: "48%",
		flex: 1,
		height: 48,
		borderRadius: 12,
		backgroundColor: "#111827",
		justifyContent: "center",
		alignItems: "center",
	},

	activeOption: {
		backgroundColor: "#2563EB",
	},

	optionText: {
		color: "#CBD5E1",
		fontWeight: "600",
	},

	activeText: {
		color: "#FFFFFF",
	},

	pressed: {
		opacity: 0.85,
		transform: [{ scale: 0.97 }],
	},
});
