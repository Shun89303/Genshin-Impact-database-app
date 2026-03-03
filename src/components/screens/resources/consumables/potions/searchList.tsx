import { potion } from "@/src/types/potion";
import { FlatList, View } from "react-native";
import PotionImage from "./potionImage";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: potion[] | { label: string; data: potion[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as potion[]}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
						<PotionImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
