import { MaterialTier } from "@/src/types/character.ascension.material";
import { FlatList, Text, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function FilterList({
	finalData,
}: {
	finalData: MaterialTier[] | { label: string; data: MaterialTier[] }[];
}) {
	return (
		<View>
			<FlatList
				data={finalData as { label: string; data: MaterialTier[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				renderItem={({ item }) => (
					<View
						style={{
							paddingVertical: 20,
							paddingHorizontal: 25,
							gap: 10,
						}}
					>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 20,
							}}
						>
							{item.label}
						</Text>
						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(item) => item.id}
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
				)}
			/>
		</View>
	);
}
