import { useFoodStore } from "@/src/store/useFood.consumables.store";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchFilterBar({ sheetRef }: { sheetRef: any }) {
	const input = useFoodStore((state) => state.input);
	const setInput = useFoodStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search by name..."
				placeholderTextColor="#888"
				value={input}
				onChangeText={setInput}
				clearButtonMode="while-editing"
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
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: "#fff",
		borderRadius: 12,
		marginHorizontal: 16,
		marginVertical: 8,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2, // for Android shadow
	},
	input: {
		flex: 1,
		height: 40,
		paddingHorizontal: 12,
		backgroundColor: "#f2f2f2",
		borderRadius: 8,
		fontSize: 16,
		marginRight: 12,
	},
	button: {
		backgroundColor: "#4f46e5", // primary color
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
});
