import { Normalized } from "@/src/types/element";
import { StyleSheet, Text, View } from "react-native";
import ElementImage from "./elementImage";

export default function ElementCard({ name, reactions, id }: Normalized) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{name}</Text>

			<View style={styles.imageContainer}>
				<ElementImage id={id} />
			</View>

			{reactions.map((reaction) => (
				<View key={reaction.name} style={styles.reactionCard}>
					<Text style={styles.sectionLabel}>Reaction</Text>
					<Text style={styles.sectionValue}>{reaction.name}</Text>

					<Text style={styles.sectionLabel}>Elements</Text>
					<View style={styles.elementsContainer}>
						{reaction.elements.map((element) => (
							<View key={element} style={styles.elementItem}>
								<Text style={styles.sectionValue}>{element}</Text>
							</View>
						))}
					</View>

					<Text style={styles.sectionLabel}>Description</Text>
					<Text style={styles.sectionValue}>{reaction.description}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#1E1E1E",
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 6,
	},

	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "700",
		color: "#FFFFFF",
		marginBottom: 12,
	},

	imageContainer: {
		alignItems: "center",
		marginBottom: 16,
	},

	reactionCard: {
		backgroundColor: "#2A2A2A",
		padding: 12,
		borderRadius: 12,
		marginBottom: 12,
	},

	sectionLabel: {
		fontSize: 12,
		fontWeight: "600",
		color: "#AAAAAA",
		marginBottom: 4,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	sectionValue: {
		fontSize: 14,
		color: "#E0E0E0",
		marginBottom: 8,
	},

	elementsContainer: {
		paddingLeft: 8,
		marginBottom: 8,
	},

	elementItem: {
		marginBottom: 4,
	},
});
