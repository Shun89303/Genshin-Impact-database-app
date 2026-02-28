import { LocalSpecialties } from "@/src/types/local.material";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function SearchList({
	finalData,
}: {
	finalData: LocalSpecialties[] | { label: string; data: LocalSpecialties[] }[];
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as LocalSpecialties[]}
				keyExtractor={(item) => item.id}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
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
