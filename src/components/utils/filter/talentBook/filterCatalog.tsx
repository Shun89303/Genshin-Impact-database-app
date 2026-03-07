import { useTalentBookMaterialsStore } from "@/src/store/useTalentBookStore";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FilterCatalog({ sheetRef }: { sheetRef: any }) {
	const setSelectedType = useTalentBookMaterialsStore(
		(state) => state.setSelectedType
	);
	const selectedType = useTalentBookMaterialsStore(
		(state) => state.selectedType
	);

	const renderButton = (
		label: string,
		type: "availability" | "rarity" | null
	) => {
		const isActive = selectedType === type;
		return (
			<Pressable
				key={label}
				style={[
					styles.button,
					isActive && styles.activeButton, // highlight active
				]}
				onPress={() => setSelectedType(type, sheetRef)}
			>
				<Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
					{label}
				</Text>
			</Pressable>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Category</Text>
			<View style={styles.buttonRow}>
				{renderButton("Availability", "availability")}
				{renderButton("Rarity", "rarity")}
				{renderButton("None", null)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		paddingHorizontal: 24,
		gap: 16,
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
	},
	title: {
		textAlign: "center",
		fontWeight: "700",
		fontSize: 16,
		color: "#1E293B",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		gap: 12,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		backgroundColor: "#72757aff",
		borderRadius: 12,
	},
	activeButton: {
		backgroundColor: "#2563EB", // darker blue for active
	},
	buttonText: {
		color: "#FFFFFF",
		fontWeight: "500",
		fontSize: 14,
	},
	activeButtonText: {
		color: "#EFF6FF", // lighter text for active
	},
	clearButton: {
		backgroundColor: "#E2E8F0",
	},
	clearButtonText: {
		color: "#1E293B",
	},
});
