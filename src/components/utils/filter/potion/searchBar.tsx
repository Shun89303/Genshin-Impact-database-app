import { usePotionStore } from "@/src/store/usePotion.consumables.store";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";

export default function SearchBar() {
	const input = usePotionStore((state) => state.input);
	const setInput = usePotionStore((state) => state.setInput);
	const colorScheme = useColorScheme();

	return (
		<View style={styles.container}>
			<TextInput
				style={[
					styles.input,
					colorScheme === "dark" ? styles.inputDark : styles.inputLight,
				]}
				placeholder="Search potion name"
				placeholderTextColor={colorScheme === "dark" ? "#A1A1AA" : "#6B7280"}
				value={input}
				onChangeText={setInput}
				clearButtonMode="while-editing"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 12,
		marginHorizontal: 16,
	},
	input: {
		height: 44,
		borderRadius: 12,
		paddingHorizontal: 16,
		fontSize: 16,
	},
	inputLight: {
		backgroundColor: "#F3F4F6",
		color: "#111827",
	},
	inputDark: {
		backgroundColor: "#1E293B",
		color: "#F9FAFB",
	},
});
