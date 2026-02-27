import { usePotionStore } from "@/src/store/usePotion.consumables.store";
import { Pressable, Text, TextInput, View } from "react-native";

export default function SearchFilterBar({ sheetRef }: { sheetRef: any }) {
	const input = usePotionStore((state) => state.input);
	const setInput = usePotionStore((state) => state.setInput);

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			<TextInput
				placeholder="Search name"
				value={input}
				onChangeText={setInput}
			/>
			<Pressable onPress={() => sheetRef.current?.expand()}>
				<Text>Filter</Text>
			</Pressable>
		</View>
	);
}
