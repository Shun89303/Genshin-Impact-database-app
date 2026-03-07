import { useWeaponAscensionMaterialsStore } from "@/src/store/useWeaponAscensionStore";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
	sheetRef: any;
}

export default function SearchFilterBar({ sheetRef }: Props) {
	const input = useWeaponAscensionMaterialsStore((state) => state.input);
	const setInput = useWeaponAscensionMaterialsStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search materials..."
				placeholderTextColor="#94a3b8"
				value={input}
				onChangeText={setInput}
				returnKeyType="search"
			/>
			<Pressable
				style={styles.button}
				onPress={() => sheetRef.current?.expand()}
			>
				<Text style={styles.buttonText}>Filter</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: "#f1f5f9", // subtle light background
		borderRadius: 12,
		marginVertical: 8,
	},

	input: {
		flex: 1,
		height: 40,
		paddingHorizontal: 12,
		backgroundColor: "#fff",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#cbd5e1",
		fontSize: 16,
		marginRight: 12,
	},

	button: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: "#3b82f6", // primary blue
		borderRadius: 8,
	},

	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
});
