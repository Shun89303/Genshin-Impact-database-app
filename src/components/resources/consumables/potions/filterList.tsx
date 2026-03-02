import { potion } from "@/src/types/potion";
import { FlatList, Text, View } from "react-native";
import PotionImage from "./potionImage";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: potion[] | { label: string; data: potion[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View>
			<FlatList
				data={finalData as { label: string; data: potion[] }[]}
				keyExtractor={(item) => item.label}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
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
							keyExtractor={(pot) => pot.id}
							renderItem={({ item }) => <PotionImage id={item.id} />}
						/>
					</View>
				)}
			/>
		</View>
	);
}
