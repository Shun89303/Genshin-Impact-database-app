import { Normalized } from "@/src/types/character.ascension.material";
import { FlatList, View } from "react-native";
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
		<View style={{ flex: 1 }}>
			<FlatList
				data={finalData as Normalized[]}
				keyExtractor={(item) => item.id}
				initialNumToRender={5}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<MaterialCard
						id={item.id}
						name={item.name}
						sources={item.sources ?? []}
						rarity={item.rarity ?? 0}
						element={item.element}
						title={item.title}
					/>
				)}
			/>
		</View>
	);
}
