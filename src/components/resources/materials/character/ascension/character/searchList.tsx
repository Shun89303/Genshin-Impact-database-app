import { MaterialTier } from "@/src/types/character.ascension.material";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function SearchList({
	finalData,
}: {
	finalData: MaterialTier[] | { label: string; data: MaterialTier[] }[];
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as MaterialTier[]}
				keyExtractor={(item) => item.id}
				numColumns={4}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
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
