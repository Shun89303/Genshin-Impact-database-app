import { useBossesStore } from "@/src/store/useBossesStore";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
	const input = useBossesStore((state) => state.input);
	const setInput = useBossesStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search boss name..."
				placeholderTextColor="#94A3B8"
				value={input}
				onChangeText={setInput}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginTop: 8,
	},

	input: {
		height: 44,
		paddingHorizontal: 14,
		borderRadius: 10,
		backgroundColor: "#1E293B",
		color: "#F8FAFC",
		fontSize: 14,
		borderWidth: 1,
		borderColor: "#334155",
	},
});
