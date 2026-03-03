import { useCharactersStore } from "@/src/store/useCharactersStore";
import { Pressable, Text, View } from "react-native";

export default function FilterCatalog({ sheetRef }: { sheetRef: any }) {
	const setSelectedType = useCharactersStore((state) => state.setSelectedType);

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
				<Pressable onPress={() => setSelectedType("vision", sheetRef)}>
					<Text>Vision</Text>
				</Pressable>
				<Pressable onPress={() => setSelectedType("weapon", sheetRef)}>
					<Text>Weapon</Text>
				</Pressable>
				<Pressable onPress={() => setSelectedType("nation", sheetRef)}>
					<Text>Nation</Text>
				</Pressable>
				<Pressable onPress={() => setSelectedType(null, sheetRef)}>
					<Text>None</Text>
				</Pressable>
			</View>
		</View>
	);
}
