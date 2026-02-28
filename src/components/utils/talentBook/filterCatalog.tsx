import { useTalentBookMaterialsStore } from "@/src/store/useTalentBookStore";
import { Pressable, Text, View } from "react-native";

export default function FilterCatalog({ sheetRef }: { sheetRef: any }) {
	const setSelectedType = useTalentBookMaterialsStore(
		(state) => state.setSelectedType
	);

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
				<Pressable onPress={() => setSelectedType("availability", sheetRef)}>
					<Text>Availability</Text>
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
