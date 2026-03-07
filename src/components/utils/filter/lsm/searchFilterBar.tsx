import { useLocalMaterialsStore } from "@/src/store/useLocalMaterialsStore";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchFilterBar({ sheetRef }: { sheetRef: any }) {
	const input = useLocalMaterialsStore((state) => state.input);
	const setInput = useLocalMaterialsStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Search name"
				value={input}
				onChangeText={setInput}
				style={styles.input}
				placeholderTextColor="#999"
			/>
			<Pressable
				onPress={() => sheetRef.current?.expand()}
				style={styles.button}
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
		padding: 10,
		backgroundColor: "#F5F5F5", // neutral light background
		borderBottomWidth: 1,
		borderBottomColor: "#D0D0D0", // subtle bottom border
	},
	input: {
		flex: 1,
		height: 40,
		backgroundColor: "#FFFFFF", // white input background
		borderWidth: 1,
		borderColor: "#CCC", // light gray border
		borderRadius: 8,
		paddingHorizontal: 10,
		marginRight: 10,
	},
	button: {
		backgroundColor: "#E0E0E0", // neutral gray button
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	buttonText: {
		color: "#333", // dark text
		fontWeight: "500",
	},
});
