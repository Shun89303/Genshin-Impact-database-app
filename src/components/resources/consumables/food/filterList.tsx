import { food } from "@/src/types/food";
import { FlatList, Text, View } from "react-native";
import FoodImage from "./foodImage";

export default function FilterList({
	finalData,
}: {
	finalData: food[] | { label: string; data: food[] }[];
}) {
	return (
		<View>
			<FlatList
				data={finalData as { label: string; data: food[] }[]}
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
							keyExtractor={(food) => food.id}
							renderItem={({ item }) => <FoodImage id={item.id} />}
						/>
					</View>
				)}
			/>
		</View>
	);
}
