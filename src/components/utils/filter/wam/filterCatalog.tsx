import { useWeaponAscensionMaterialsStore } from "@/src/store/useWeaponAscensionStore";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
	sheetRef: any;
}

export default function FilterCatalog({ sheetRef }: Props) {
	const selectedType = useWeaponAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const setSelectedType = useWeaponAscensionMaterialsStore(
		(state) => state.setSelectedType
	);

	const isActive = (type: string | null) => selectedType === type;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Category</Text>
			<View style={styles.buttonsRow}>
				<Pressable
					style={[
						styles.button,
						isActive("availability") && styles.activeButton,
					]}
					onPress={() => setSelectedType("availability", sheetRef)}
				>
					<Text
						style={[
							styles.buttonText,
							isActive("availability") && styles.activeButtonText,
						]}
					>
						Availability
					</Text>
				</Pressable>

				<Pressable
					style={[
						styles.button,
						styles.noneButton,
						isActive(null) && styles.activeButton,
					]}
					onPress={() => setSelectedType(null, sheetRef)}
				>
					<Text
						style={[
							styles.buttonText,
							styles.noneButtonText,
							isActive(null) && styles.activeButtonText,
						]}
					>
						None
					</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 20,
		paddingVertical: 16,
		paddingHorizontal: 24,
	},

	title: {
		textAlign: "center",
		fontWeight: "700",
		fontSize: 18,
		color: "#1e293b",
	},

	buttonsRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},

	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#e2e8f0", // default gray for non-primary
		borderRadius: 8,
	},

	activeButton: {
		backgroundColor: "#3b82f6", // primary blue
	},

	buttonText: {
		color: "#334155",
		fontSize: 16,
		fontWeight: "600",
	},

	activeButtonText: {
		color: "#fff",
	},

	noneButton: {
		backgroundColor: "#f1f5f9",
		borderWidth: 1,
		borderColor: "#cbd5e1",
	},

	noneButtonText: {
		color: "#334155",
	},
});
