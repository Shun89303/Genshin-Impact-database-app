import { food } from "@/src/types/food";
import { FlatList, View } from "react-native";
import FoodImage from "./foodImage";

export default function SearchList({
	finalData,
}: {
	finalData: food[] | { label: string; data: food[] }[];
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as food[]}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
						<FoodImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
