import { useCharacterAscensionMaterialsStore } from "@/src/store/useCharacterAscensionStore";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchFilterBar({ sheetRef }: { sheetRef: any }) {
	const input = useCharacterAscensionMaterialsStore((state) => state.input);
	const setInput = useCharacterAscensionMaterialsStore(
		(state) => state.setInput
	);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search name"
				value={input}
				onChangeText={setInput}
				placeholderTextColor="#888"
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
		backgroundColor: "#fff",
		borderRadius: 12,
		marginHorizontal: 16,
		marginVertical: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	input: {
		flex: 1,
		height: 40,
		paddingHorizontal: 12,
		backgroundColor: "#f1f1f1",
		borderRadius: 8,
		fontSize: 16,
		marginRight: 12,
	},
	button: {
		backgroundColor: "#4f46e5", // subtle primary color
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 8,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
});
