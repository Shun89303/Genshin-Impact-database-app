import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home() {
	return (
		<ScrollView contentContainerStyle={styles.content}>
			<View style={styles.container}>
				<Text style={styles.title}>Genshin Impact Database</Text>

				<Text style={styles.paragraph}>
					This application is a mobile database for the game Genshin Impact. It
					retrieves game data from a public Genshin Impact API and presents it
					in a clean and structured interface.
				</Text>

				<Text style={styles.paragraph}>
					The goal of this app is to make in-game information easy to browse.
					Users can explore characters, weapons, materials, food, bosses, and
					other game data without needing to search through multiple sources.
				</Text>

				<Text style={styles.paragraph}>
					Each section organizes data into lists with images and clear grouping
					so information can be quickly found and understood.
				</Text>

				<Text style={styles.note}>
					This project is an unofficial companion database and is not affiliated
					with HoYoverse.
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
