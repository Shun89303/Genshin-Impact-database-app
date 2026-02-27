import { useFoodStore } from "@/src/store/useFood.consumables.store";
import { Pressable, Text, View } from "react-native";

export default function FilterCatalog({ sheetRef }: { sheetRef: any }) {
	const setSelectedType = useFoodStore((state) => state.setSelectedType);

	return (
		<View style={{ gap: 30 }}>
			<Text style={{ textAlign: "center", fontWeight: "bold" }}>Category</Text>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<Pressable onPress={() => setSelectedType("type", sheetRef)}>
					<Text>Type</Text>
				</Pressable>
				<Pressable onPress={() => setSelectedType("rarity", sheetRef)}>
					<Text>Rarity</Text>
				</Pressable>
				<Pressable onPress={() => setSelectedType(null, sheetRef)}>
					<Text>None</Text>
				</Pressable>
			</View>
		</View>
	);
}
