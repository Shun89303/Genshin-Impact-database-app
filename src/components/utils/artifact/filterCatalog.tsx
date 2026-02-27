import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import { Pressable, Text, View } from "react-native";

export default function FilterCatalog({ sheetRef }: { sheetRef: any }) {
	const setSelectedType = useArtifactsStore((state) => state.setSelectedType);

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
				<Pressable onPress={() => setSelectedType("max_rarity", sheetRef)}>
					<Text>Max Rarity</Text>
				</Pressable>
				<Pressable onPress={() => setSelectedType(null, sheetRef)}>
					<Text>None</Text>
				</Pressable>
			</View>
		</View>
	);
}
