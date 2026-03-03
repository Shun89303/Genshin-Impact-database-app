import { Normalized } from "@/src/types/weapon.ascension.material";
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
		<View style={{ alignItems: "center", paddingBottom: 30 }}>
			<FlatList
				data={finalData as Normalized[]}
				keyExtractor={(item) => item.id}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<MaterialCard
						materialName={item.id}
						items={item.items ?? []}
						weapons={item.weapons ?? []}
						availability={item.availability ?? []}
						source={item.source ?? ""}
					/>
				)}
			/>
		</View>
	);
}
