import { MaterialTier } from "@/src/types/character.ascension.material";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: MaterialTier[] | { label: string; data: MaterialTier[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as MaterialTier[]}
				keyExtractor={(item) => item.id}
				numColumns={4}
				initialNumToRender={20}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<View
						key={item.id}
						style={{ justifyContent: "space-evenly", padding: 10 }}
					>
						<MaterialsImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
