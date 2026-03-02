import { Weapon } from "@/src/types/weapon";
import { FlatList, View } from "react-native";
import WeaponImage from "./weaponImage";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Weapon[] | { label: string; data: Weapon[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as Weapon[]}
				initialNumToRender={15}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
						<WeaponImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
