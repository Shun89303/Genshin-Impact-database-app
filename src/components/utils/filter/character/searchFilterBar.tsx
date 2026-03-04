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
		backgroundColor: "#1E293B",
		borderRadius: 12,
		paddingHorizontal: 16,
		justifyContent: "center",
	},

	input: {
		color: "#FFFFFF",
		fontSize: 16,
	},

	button: {
		height: 48,
		paddingHorizontal: 20,
		borderRadius: 12,
		backgroundColor: "#2563EB",
		justifyContent: "center",
		alignItems: "center",
	},

	buttonText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 14,
	},

	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.97 }],
	},
});
