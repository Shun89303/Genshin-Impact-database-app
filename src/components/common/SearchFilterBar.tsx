import {
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

type SearchFilterBarProps = {
	value: string;
	onChangeText: (text: string) => void;
	onFilterPress: () => void;
	containerStyle?: ViewStyle;
	inputStyle?: TextStyle;
	buttonStyle?: ViewStyle;
	buttonTextStyle?: TextStyle;
	placeholder?: string;
};

export default function SearchFilterBar({
	value,
	onChangeText,
	onFilterPress,
	containerStyle,
	inputStyle,
	buttonStyle,
	buttonTextStyle,
	placeholder = "Search name",
}: SearchFilterBarProps) {
	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.inputWrapper}>
				<TextInput
					placeholder={placeholder}
					placeholderTextColor="#A8B2C1"
					value={value}
					onChangeText={onChangeText}
					style={[styles.input, inputStyle]}
				/>
			</View>

			<Pressable
				style={({ pressed }) => [
					styles.button,
					pressed && styles.pressed,
					buttonStyle,
				]}
				onPress={onFilterPress}
			>
				<Text style={[styles.buttonText, buttonTextStyle]}>Filter</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},

	inputWrapper: {
		flex: 1,
		height: 48,
		backgroundColor: "#F8FAFC",
		borderRadius: 12,
		paddingHorizontal: 16,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#EEF2F7",
	},

	input: {
		color: "#334155",
		fontSize: 16,
	},

	button: {
		height: 48,
		paddingHorizontal: 20,
		borderRadius: 12,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#E6ECF3",
		justifyContent: "center",
		alignItems: "center",
	},

	buttonText: {
		color: "#475569",
		fontWeight: "600",
		fontSize: 14,
	},

	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.97 }],
	},
});
