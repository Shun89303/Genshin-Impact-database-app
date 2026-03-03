import { Normalized } from "@/src/types/local.material";
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
		<View>
			<FlatList
				data={finalData as Normalized[]}
				keyExtractor={(item) => item.nation}
				initialNumToRender={12}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<MaterialCard nationName={item.nation} items={item.items} />
				)}
			/>
		</View>
	);
}
