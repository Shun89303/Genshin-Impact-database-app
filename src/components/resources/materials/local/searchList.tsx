import { LocalSpecialties } from "@/src/types/local.material";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: LocalSpecialties[] | { label: string; data: LocalSpecialties[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as LocalSpecialties[]}
				keyExtractor={(item) => item.id}
				initialNumToRender={12}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
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
