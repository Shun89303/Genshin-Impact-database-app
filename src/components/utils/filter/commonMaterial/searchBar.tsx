import { useCommonAscensionMaterialsStore } from "@/src/store/useCommonAscensionStore";
import { TextInput, View } from "react-native";

export default function SearchBar() {
	const input = useCommonAscensionMaterialsStore((state) => state.input);
	const setInput = useCommonAscensionMaterialsStore((state) => state.setInput);

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
