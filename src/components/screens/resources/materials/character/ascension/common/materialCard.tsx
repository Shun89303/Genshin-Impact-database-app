import { Normalized } from "@/src/types/common.ascension.material";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CharacterImage from "./characterImage";
import MaterialsImage from "./materialsImage";
import WeaponImage from "./weaponImage";

export default function MaterialCard({
	material,
	characters,
	weapons,
	items,
	sources,
}: Normalized) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{material}</Text>

			{/* Materials */}
			<FlatList
				data={items}
				keyExtractor={(item) => item.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.horizontalList}
				renderItem={({ item }) => (
					<View style={styles.itemWrapper}>
						<MaterialsImage id={item.id} />
						<Text style={styles.itemName}>{item.name}</Text>
					</View>
				)}
			/>

			{/* Sources */}
			<View style={[styles.section, styles.divider]}>
				<Text style={styles.sectionTitle}>Sources</Text>
				{sources.map((source) => (
					<Text key={source} style={styles.sourceText}>
						• {source}
					</Text>
				))}
			</View>

			{/* Characters */}
			<View style={[styles.section, styles.divider]}>
				<Text style={styles.sectionTitle}>Characters</Text>
				<FlatList
					data={characters}
					keyExtractor={(item) => item}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.horizontalList}
					renderItem={({ item }) => (
						<View style={styles.itemWrapper}>
							<CharacterImage item={item} />
						</View>
					)}
				/>
			</View>

			{/* Weapons */}
			<View style={[styles.section, styles.divider]}>
				<Text style={styles.sectionTitle}>Weapons</Text>
				<FlatList
					data={weapons}
					keyExtractor={(item) => item}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.horizontalList}
					renderItem={({ item }) => (
						<View style={styles.itemWrapper}>
							<WeaponImage item={item} />
						</View>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		padding: 16,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		marginBottom: 40,
	},

	title: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 16,
		color: "#111827",
	},

	section: {
		marginTop: 24,
	},

	divider: {
		borderTopWidth: 1,
		borderTopColor: "#F3F4F6",
		paddingTop: 16,
	},

	sectionTitle: {
		fontSize: 15,
		fontWeight: "600",
		marginBottom: 12,
		color: "#374151",
	},

	horizontalList: {
		paddingVertical: 4,
		flexDirection: "row",
		alignItems: "center",
		gap: 16, // evenly space items
	},

	itemWrapper: {
		alignItems: "center", // centers image + name
	},

	itemName: {
		marginTop: 6,
		fontSize: 13,
		color: "#374151",
		textAlign: "center",
	},

	sourceText: {
		fontSize: 13,
		color: "#6B7280",
		marginBottom: 4,
		lineHeight: 18,
	},
});
