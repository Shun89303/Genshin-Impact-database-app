import { Weapon } from "@/src/types/weapon";
import { FlatList, StyleSheet, Text, View } from "react-native";
import WeaponImage from "./weaponImage";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Weapon[] | { label: string; data: Weapon[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as { label: string; data: Weapon[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={15}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>{item.label}</Text>
						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(wea) => wea.id}
							renderItem={({ item }) => <WeaponImage id={item.id} />}
							contentContainerStyle={styles.horizontalList}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0F172A", // matches Weapons screen background
	},

	listContent: {
		paddingVertical: 12,
	},

	section: {
		paddingVertical: 20,
		paddingHorizontal: 16,
	},

	sectionTitle: {
		fontWeight: "700",
		fontSize: 20,
		color: "#F9FAFB",
		marginBottom: 12,
	},

	horizontalList: {
		gap: 12,
	},
});
