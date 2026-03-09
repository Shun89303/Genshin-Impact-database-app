import { NormalizedFood } from "@/src/types/food";
import { FlatList, StyleSheet, View } from "react-native";
import FoodCard from "./foodCard";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: NormalizedFood[] | { label: string; data: NormalizedFood[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as NormalizedFood[]}
				numColumns={2}
				initialNumToRender={12}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => <FoodCard food={item} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 16,
	},
	listContent: {
		paddingVertical: 12,
		paddingBottom: 24,
	},
});
