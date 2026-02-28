import { TalentBook } from "@/src/types/talent.book";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function SearchList({
	finalData,
}: {
	finalData: TalentBook[] | { label: string; data: TalentBook[] }[];
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as TalentBook[]}
				keyExtractor={(item) => item.id}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				renderItem={({ item }) => (
					<FlatList
						data={item.items}
						keyExtractor={(item) => item.id}
						numColumns={4}
						initialNumToRender={8}
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
				)}
			/>
		</View>
	);
}
