import { endpoints } from "@/src/api/endpoints";
import FallbackImage from "@/src/components/common/FallbackImage";
import { BASE_URL } from "@/src/config/env";
import { Normalized } from "@/src/types/element";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ElementCard({ name, reactions, id }: Normalized) {
	const { elements, icon } = endpoints;
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{name}</Text>

			<View style={styles.imageContainer}>
				<FallbackImage
					uri={`${BASE_URL}${elements}/${id}${icon}`}
					style={{ width: 100, height: 100, borderRadius: 16 }}
					backgroundColor="black"
				/>
			</View>

			{reactions.map((reaction) => (
				<View key={reaction.name} style={styles.reactionCard}>
					<Text style={styles.sectionLabel}>Reaction</Text>
					<Text style={styles.sectionValue}>{reaction.name}</Text>

					<Text style={styles.sectionLabel}>Elements</Text>
					<View style={styles.elementsContainer}>
						{reaction.elements.map((element) => (
							<View key={element} style={styles.elementItem}>
								<Text style={styles.elementText}>{element}</Text>
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
		backgroundColor: "#F8F8F8", // soft white
		padding: 18,
		borderRadius: 16,
		marginBottom: 18,
		borderWidth: 1, // add border
		borderColor: "#DDDDDD", // neutral gray border
		shadowColor: "#00000020",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 4,
		width: "95%",
		maxWidth: SCREEN_WIDTH - 32,
		alignSelf: "center",
	},

	title: {
		textAlign: "center",
		fontSize: 22,
		fontWeight: "700",
		color: "#333333",
		marginBottom: 16,
	},

	imageContainer: {
		alignItems: "center",
		marginBottom: 20,
	},

	reactionCard: {
		backgroundColor: "#FFFFFF",
		padding: 14,
		borderRadius: 14,
		marginBottom: 14,
		borderWidth: 1,
		borderColor: "#DDDDDD",
	},

	sectionLabel: {
		fontSize: 12,
		fontWeight: "600",
		color: "#888888",
		marginBottom: 4,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},

	sectionValue: {
		fontSize: 15,
		color: "#444444",
		marginBottom: 10,
	},

	elementsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 10,
	},

	elementItem: {
		backgroundColor: "#EEEEEE",
		borderRadius: 8,
		paddingVertical: 4,
		paddingHorizontal: 8,
		marginRight: 6,
		marginBottom: 6,
	},

	elementText: {
		color: "#333333",
		fontSize: 13,
		fontWeight: "500",
	},
});
