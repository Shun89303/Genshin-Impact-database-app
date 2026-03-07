import { NormalizedPotion } from "@/src/types/potion";
import { FlatList, View } from "react-native";
import PotionCard from "./potionCard";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: NormalizedPotion[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={finalData}
				windowSize={21}
				removeClippedSubviews
				numColumns={2}
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={{ paddingBottom: 20 }}
				renderItem={({ item }) => <PotionCard potion={item} />}
			/>
		</View>
	);
}
