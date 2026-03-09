import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ResourcesScreen() {
	return (
		<ScrollView contentContainerStyle={styles.content}>
			<View style={styles.container}>
				<Text style={styles.title}>Resources</Text>

				<Text style={styles.paragraph}>
					This section contains resource-type items from the game. These are not
					primary entities like characters or weapons, but supporting items used
					throughout gameplay.
				</Text>

				<Text style={styles.paragraph}>
					The top tabs in this section organize different categories of
					resources such as food, upgrade materials, and other consumable or
					crafting items.
				</Text>

				<Text style={styles.paragraph}>
					These items are commonly used for character progression, weapon
					enhancement, crafting, and other in-game systems. The tabs allow quick
					navigation between each resource category.
				</Text>

				<Text style={styles.note}>
					Use the tabs above to browse the available resource types.
				</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: {
		padding: 20,
	},

	container: {
		gap: 16,
	},

	title: {
		fontSize: 26,
		fontWeight: "700",
	},

	paragraph: {
		fontSize: 16,
		lineHeight: 24,
	},

	note: {
		marginTop: 10,
		fontSize: 14,
		opacity: 0.7,
	},
});
