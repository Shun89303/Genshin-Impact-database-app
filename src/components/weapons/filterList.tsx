import { Weapon } from "@/src/types/weapon";
import { FlatList, Text, View } from "react-native";
import WeaponImage from "./weaponImage";

export default function FilterList({
	finalData,
}: {
	finalData: Weapon[] | { label: string; data: Weapon[] }[];
}) {
	return (
		<View>
			<FlatList
				data={finalData as { label: string; data: Weapon[] }[]}
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
							keyExtractor={(wea) => wea.id}
							renderItem={({ item }) => <WeaponImage id={item.id} />}
						/>
					</View>
				)}
			/>
		</View>
	);
}
