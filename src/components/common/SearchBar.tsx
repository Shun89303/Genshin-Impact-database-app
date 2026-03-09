import { StyleSheet, TextInput, View } from "react-native";

type Props = {
	value: string;
	onChange: (text: string) => void;
	placeholder?: string;
};

export default function SearchBar({
	value,
	onChange,
	placeholder = "Search...",
}: Props) {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor="#94A3B8"
				value={value}
				onChangeText={onChange}
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
		backgroundColor: "#F8FAFC",
		color: "#0F172A",
		fontSize: 14,
		borderWidth: 1,
		borderColor: "#334155",
	},
});
