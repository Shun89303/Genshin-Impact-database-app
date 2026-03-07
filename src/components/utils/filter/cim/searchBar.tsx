import { useCookingMaterialsStore } from "@/src/store/useCookingMaterialsStore";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
	const input = useCookingMaterialsStore((state) => state.input);
	const setInput = useCookingMaterialsStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search name"
				value={input}
				onChangeText={setInput}
				placeholderTextColor="#888"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 12,
		marginHorizontal: 16,
		backgroundColor: "#fff",
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 8,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2, // for Android shadow
	},
	input: {
		fontSize: 16,
		color: "#333",
		paddingVertical: 6,
	},
});
