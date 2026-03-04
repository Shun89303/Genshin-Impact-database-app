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
					<View style={styles.imageWrapper}>
						<MaterialsImage
							id={item.id}
							name={item.name}
							rarity={item.rarity}
						/>
					</View>
				)}
			/>

			{/* Sources */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Sources</Text>
				{sources.map((source) => (
					<Text key={source} style={styles.sourceText}>
						• {source}
					</Text>
				))}
			</View>

			{/* Characters */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Characters</Text>
				<FlatList
					data={characters}
					keyExtractor={(item) => item}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.horizontalList}
					renderItem={({ item }) => (
						<View style={styles.imageWrapper}>
							<CharacterImage item={item} />
						</View>
					)}
				/>
			</View>

			{/* Weapons */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Weapons</Text>
				<FlatList
					data={weapons}
					keyExtractor={(item) => item}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.horizontalList}
					renderItem={({ item }) => (
						<View style={styles.imageWrapper}>
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
		backgroundColor: "#1E1E1E",
		borderRadius: 16,
		padding: 16,
		marginVertical: 12,
	},

	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 12,
		color: "#FFFFFF",
	},

	section: {
		marginTop: 20,
	},

	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		color: "#E0E0E0",
	},

	horizontalList: {
		gap: 12,
	},

	imageWrapper: {
		marginRight: 12,
	},

	sourceText: {
		fontSize: 14,
		color: "#BDBDBD",
		marginBottom: 4,
	},
});
