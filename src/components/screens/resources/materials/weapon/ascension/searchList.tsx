import { wam } from "@/src/types/weapon.ascension.material";
import { FlatList, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: wam[] | { label: string; data: wam[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={{ alignItems: "center", paddingBottom: 30 }}>
			<FlatList
				data={finalData as wam[]}
				keyExtractor={(item) => item.id}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
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
