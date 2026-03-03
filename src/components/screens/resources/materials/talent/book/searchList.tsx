import { Normalized } from "@/src/types/talent.book";
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
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as Normalized[]}
				keyExtractor={(item) => item.id}
				initialNumToRender={12}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<MaterialCard
						materialName={item.id}
						items={item.items ?? []}
						charactersArray={item.characters ?? []}
						availability={item.availability ?? []}
						source={item.source ?? ""}
					/>
				)}
			/>
		</View>
	);
}
