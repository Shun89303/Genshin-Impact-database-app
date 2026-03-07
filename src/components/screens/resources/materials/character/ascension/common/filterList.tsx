import { Normalized } from "@/src/types/common.ascension.material";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialsImage from "./materialsImage";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Normalized[] | { label: string; data: Normalized[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	const insets = useSafeAreaInsets(); // get device safe area

	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as { label: string; data: Normalized[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={12}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={[
					styles.listContent,
					{ paddingBottom: insets.bottom + 20 }, // extra bottom padding
				]}
				renderItem={({ item }) => (
					<View style={styles.group}>
						<Text style={styles.groupTitle}>{item.label}</Text>
						<FlatList
							horizontal
							data={item.data.flatMap((d) => d.items)}
							keyExtractor={(i) => i.id}
							contentContainerStyle={styles.horizontalList}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item }) => (
								<View style={styles.itemWrapper}>
									<MaterialsImage id={item.id} />
									<Text style={styles.itemName} numberOfLines={1}>
										{item.name}
									</Text>
								</View>
							)}
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
		paddingBottom: 20,
	},

	group: {
		paddingVertical: 20,
		paddingHorizontal: 16,
	},

	groupTitle: {
		fontWeight: "700",
		fontSize: 20,
		color: "#111827",
		marginBottom: 12,
	},

	horizontalList: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},

	itemWrapper: {
		alignItems: "center",
		width: 100,
	},

	itemName: {
		marginTop: 6,
		fontSize: 13,
		color: "#374151",
		textAlign: "center",
	},
});
