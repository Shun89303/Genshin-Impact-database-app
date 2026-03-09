import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ConsumablesScreen() {
	return (
		<ScrollView contentContainerStyle={styles.content}>
			<View style={styles.container}>
				<Text style={styles.title}>Consumables</Text>

				<Text style={styles.paragraph}>
					This section contains consumable items available in the game.
					Consumables are items that can be used during gameplay to provide
					various temporary effects or benefits.
				</Text>

				<Text style={styles.paragraph}>
					Inside this screen there are two additional top tabs. These tabs
					separate consumables into two main categories: food and potions.
				</Text>

				<Text style={styles.paragraph}>
					Food items typically restore health or provide combat buffs, while
					potions grant elemental resistance or other temporary effects.
				</Text>

				<Text style={styles.note}>
					Use the tabs above to explore the available food and potion items.
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
