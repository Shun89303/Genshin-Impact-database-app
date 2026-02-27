import { potion } from "@/src/types/potion";
import { FlatList, View } from "react-native";
import PotionImage from "./potionImage";

export default function SearchList({
	finalData,
}: {
	finalData: potion[] | { label: string; data: potion[] }[];
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as potion[]}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
						<PotionImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
