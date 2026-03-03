import { useBossMaterialsStore } from "@/src/store/useBossMaterialsStore";
import { TextInput, View } from "react-native";

export default function SearchBar() {
	const input = useBossMaterialsStore((state) => state.input);
	const setInput = useBossMaterialsStore((state) => state.setInput);

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
