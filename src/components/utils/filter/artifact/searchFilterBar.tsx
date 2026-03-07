import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchFilterBar({ sheetRef }: { sheetRef: any }) {
	const input = useArtifactsStore((state) => state.input);
	const setInput = useArtifactsStore((state) => state.setInput);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search artifact name"
				placeholderTextColor="#9CA3AF"
				value={input}
				onChangeText={setInput}
			/>

			<Pressable
				style={({ pressed }) => [
					styles.filterButton,
					pressed && styles.filterButtonPressed,
				]}
				onPress={() => sheetRef.current?.expand()}
			>
				<Text style={styles.filterText}>Filter</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: "#FFFFFF",
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},

	input: {
		flex: 1,
		height: 42,
		paddingHorizontal: 14,
		borderRadius: 10,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#E5E7EB",
		color: "#111827",
		fontSize: 14,
	},

	filterButton: {
		height: 42,
		paddingHorizontal: 16,
		borderRadius: 10,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#E5E7EB",
		justifyContent: "center",
		alignItems: "center",
	},

	filterButtonPressed: {
		backgroundColor: "#F3F4F6",
	},

	filterText: {
		color: "#111827",
		fontWeight: "600",
		fontSize: 14,
	},
});
