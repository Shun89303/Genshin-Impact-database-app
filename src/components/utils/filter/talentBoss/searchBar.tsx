import { useTalentBossMaterialsStore } from "@/src/store/useTalentBossStore";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
	const input = useTalentBossMaterialsStore((state) => state.input);
	const setInput = useTalentBossMaterialsStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search name"
				placeholderTextColor="#94A3B8"
				value={input}
				onChangeText={setInput}
				autoCapitalize="none"
				autoCorrect={false}
				clearButtonMode="while-editing"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
	},

	input: {
		height: 44,
		paddingHorizontal: 14,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#334155",
		backgroundColor: "#1E293B",
		color: "#F1F5F9",
		fontSize: 16,
	},
});
