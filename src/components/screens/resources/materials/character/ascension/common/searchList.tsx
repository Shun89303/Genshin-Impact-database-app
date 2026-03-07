import { Normalized } from "@/src/types/common.ascension.material";
import { FlatList, StyleSheet, View } from "react-native";
import MaterialCard from "./materialCard";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Normalized[] | { label: string; data: Normalized[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as Normalized[]}
				keyExtractor={(item) => item.material}
				initialNumToRender={6}
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<View style={styles.cardWrapper}>
						<MaterialCard
							material={item.material}
							characters={item.characters ?? []}
							weapons={item.weapons ?? []}
							items={item.items}
							sources={item.sources}
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
		backgroundColor: "#FFFFFF",
	},

	listContent: {
		paddingHorizontal: 14,
		paddingVertical: 12,
	},

	cardWrapper: {
		marginBottom: 14,
	},
});
