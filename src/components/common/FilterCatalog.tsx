import {
	Pressable,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

export type FilterOption<T = string | null> = {
	label: string;
	value: T;
};

type FilterCatalogProps<T = string | null> = {
	title?: string;
	options: FilterOption<T>[];
	selectedValue: T;
	onSelect: (value: T) => void;
	containerStyle?: ViewStyle;
	gridStyle?: ViewStyle;
	optionStyle?: ViewStyle;
	activeOptionStyle?: ViewStyle;
	optionTextStyle?: TextStyle;
	activeTextStyle?: TextStyle;
};

export default function FilterCatalog<T extends string | null>({
	title = "Category",
	options,
	selectedValue,
	onSelect,
	containerStyle,
	gridStyle,
	optionStyle,
	activeOptionStyle,
	optionTextStyle,
	activeTextStyle,
}: FilterCatalogProps<T>) {
	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={styles.title}>{title}</Text>

			<View style={[styles.grid, gridStyle]}>
				{options.map((item) => {
					const isActive = selectedValue === item.value;

					return (
						<Pressable
							key={item.label}
							onPress={() => onSelect(item.value)}
							style={({ pressed }) => [
								styles.option,
								optionStyle,
								isActive && [styles.activeOption, activeOptionStyle],
								pressed && styles.pressed,
							]}
						>
							<Text
								style={[
									styles.optionText,
									optionTextStyle,
									isActive && [styles.activeText, activeTextStyle],
								]}
							>
								{item.label}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 24,
		gap: 24,
	},

	title: {
		fontSize: 18,
		fontWeight: "700",
		textAlign: "center",
		color: "#334155",
	},

	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},

	option: {
		width: "48%",
		height: 48,
		borderRadius: 12,
		backgroundColor: "#F8FAFC",
		borderWidth: 1,
		borderColor: "#E6ECF3",
		justifyContent: "center",
		alignItems: "center",
	},

	activeOption: {
		backgroundColor: "#FFFFFF",
		borderColor: "#D8E1EC",
	},

	optionText: {
		color: "#64748B",
		fontWeight: "600",
	},

	activeText: {
		color: "#334155",
	},

	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.97 }],
	},
});
