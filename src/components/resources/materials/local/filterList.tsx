import { LocalSpecialties } from "@/src/types/local.material";
import { FlatList, Text, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function FilterList({
	finalData,
}: {
	finalData: LocalSpecialties[] | { label: string; data: LocalSpecialties[] }[];
}) {
	return (
		<View>
			<FlatList
				data={finalData as { label: string; data: LocalSpecialties[] }[]}
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
