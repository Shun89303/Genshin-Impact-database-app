import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function WeaponsScreen() {
	return (
		<ScrollView contentContainerStyle={styles.content}>
			<View style={styles.container}>
				<Text style={styles.title}>Weapon Materials</Text>

				<Text style={styles.paragraph}>
					This section contains materials related to weapon progression. These
					materials are used to strengthen and upgrade weapons in the game.
				</Text>

				<Text style={styles.paragraph}>
					Inside this screen there are two additional top tabs that organize the
					available weapon materials into different categories.
				</Text>

				<Text style={styles.paragraph}>
					One tab displays weapon ascension materials used to increase a
					weapon’s ascension level, while the other tab shows weapon experience
					materials used to level up weapons.
				</Text>

				<Text style={styles.note}>
					Use the tabs above to switch between weapon ascension materials and
					weapon experience materials.
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
