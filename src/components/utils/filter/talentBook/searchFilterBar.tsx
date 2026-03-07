import { useTalentBookMaterialsStore } from "@/src/store/useTalentBookStore";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchFilterBar({ sheetRef }: { sheetRef: any }) {
	const input = useTalentBookMaterialsStore((state) => state.input);
	const setInput = useTalentBookMaterialsStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search name"
				placeholderTextColor="#94A3B8" // subtle gray placeholder
				value={input}
				onChangeText={setInput}
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
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		marginVertical: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2, // for Android shadow
	},
	input: {
		flex: 1,
		height: 40,
		paddingHorizontal: 12,
		backgroundColor: "#F1F5F9",
		borderRadius: 10,
		fontSize: 14,
		color: "#1E293B",
	},
	button: {
		marginLeft: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
		backgroundColor: "#3B82F6",
		borderRadius: 10,
	},
	buttonText: {
		color: "#FFFFFF",
		fontWeight: "500",
		fontSize: 14,
	},
});
