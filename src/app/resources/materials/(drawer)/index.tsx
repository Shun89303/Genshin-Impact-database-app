import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function MaterialsBranch() {
	return (
		<ScrollView contentContainerStyle={styles.content}>
			<View style={styles.container}>
				<Text style={styles.title}>Materials</Text>

				<Text style={styles.paragraph}>
					This section was originally intended to contain various types of
					in-game materials used for progression and crafting.
				</Text>

				<Text style={styles.paragraph}>
					However, most material categories were removed to keep the application
					focused and easier to navigate.
				</Text>

				<Text style={styles.paragraph}>
					The only material type currently available in this section is weapon
					ascension materials.
				</Text>

				<Text style={styles.note}>
					You can access the weapon materials list through the drawer menu
					(hamburger icon) located at the top left of the screen, just below the
					top tabs.
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
