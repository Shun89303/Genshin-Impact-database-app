import { useBossMaterialsStore } from "@/src/store/useBossMaterialsStore";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
	const input = useBossMaterialsStore((state) => state.input);
	const setInput = useBossMaterialsStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search name"
				placeholderTextColor="#888"
				value={input}
				onChangeText={setInput}
				returnKeyType="search"
				clearButtonMode="while-editing"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		marginHorizontal: 16,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 10,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	input: {
		height: 40,
		fontSize: 16,
		color: "#000",
	},
});
