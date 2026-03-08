import { useCharactersStore } from "@/src/store/useCharactersStore";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchFilterBar({ sheetRef }: { sheetRef: any }) {
	const input = useCharactersStore((state) => state.input);
	const setInput = useCharactersStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<View style={styles.inputWrapper}>
				<TextInput
					placeholder="Search name"
					placeholderTextColor="#94A3B8"
					value={input}
					onChangeText={setInput}
					style={styles.input}
				/>
			</View>

			<Pressable
				style={({ pressed }) => [styles.button, pressed && styles.pressed]}
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
		gap: 12,
	},

	inputWrapper: {
		flex: 1,
		height: 48,
		backgroundColor: "#F5F5F5", // light neutral white
		borderRadius: 12,
		paddingHorizontal: 16,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#E0E0E0", // subtle visible border
	},

	input: {
		color: "#111111", // dark text for readability
		fontSize: 16,
	},

	button: {
		height: 48,
		paddingHorizontal: 20,
		borderRadius: 12,
		backgroundColor: "#D1D5DB", // soft gray button
		justifyContent: "center",
		alignItems: "center",
	},

	buttonText: {
		color: "#111111", // dark text for contrast
		fontWeight: "600",
		fontSize: 14,
	},

	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.97 }],
	},
});
