import { food } from "@/src/types/food";
import { FlatList, View } from "react-native";
import FoodImage from "./foodImage";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: food[] | { label: string; data: food[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as food[]}
				initialNumToRender={12}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
						<FoodImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
