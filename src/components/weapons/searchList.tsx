import { Weapon } from "@/src/types/weapon";
import { FlatList, View } from "react-native";
import WeaponImage from "./weaponImage";

export default function SearchList({
	finalData,
}: {
	finalData: Weapon[] | { label: string; data: Weapon[] }[];
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as Weapon[]}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
						<WeaponImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
