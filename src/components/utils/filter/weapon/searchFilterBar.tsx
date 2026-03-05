import { useWeaponsStore } from "@/src/store/useWeaponsStore";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchFilterBar({ sheetRef }: { sheetRef: any }) {
	const input = useWeaponsStore((state) => state.input);
	const setInput = useWeaponsStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search weapon name"
				placeholderTextColor="#9CA3AF"
				value={input}
				onChangeText={setInput}
			/>

			<Pressable
				style={({ pressed }) => [
					styles.filterButton,
					pressed && styles.filterButtonPressed,
				]}
				onPress={() => sheetRef.current?.expand()}
			>
				<Text style={styles.filterText}>Filter</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	input: {
		flex: 1,
		height: 44,
		paddingHorizontal: 14,
		borderRadius: 10,
		backgroundColor: "#1F2937",
		color: "#FFFFFF",
		fontSize: 15,
	},

	filterButton: {
		height: 44,
		paddingHorizontal: 18,
		borderRadius: 10,
		backgroundColor: "#2563EB",
		justifyContent: "center",
		alignItems: "center",
	},

	filterButtonPressed: {
		opacity: 0.8,
	},

	filterText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 14,
	},
});
