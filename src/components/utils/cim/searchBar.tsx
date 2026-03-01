import { useCookingMaterialsStore } from "@/src/store/useCookingMaterialsStore";
import { TextInput, View } from "react-native";

export default function SearchBar() {
	const input = useCookingMaterialsStore((state) => state.input);
	const setInput = useCookingMaterialsStore((state) => state.setInput);

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
		</View>
	);
}
