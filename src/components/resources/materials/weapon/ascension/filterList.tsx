import { wam } from "@/src/types/weapon.ascension.material";
import { FlatList, Text, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function FilterList({
	finalData,
}: {
	finalData: wam[] | { label: string; data: wam[] }[];
}) {
	return (
		<View>
			<FlatList
				data={finalData as { label: string; data: wam[] }[]}
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
								<>
									{item.items.map((materialItem) => (
										<View
											key={materialItem.id}
											style={{ justifyContent: "space-evenly", padding: 10 }}
										>
											<MaterialsImage id={materialItem.id} />
										</View>
									))}
								</>
							)}
						/>
					</View>
				)}
			/>
		</View>
	);
}
