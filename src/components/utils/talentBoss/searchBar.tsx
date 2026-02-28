import { useTalentBossMaterialsStore } from "@/src/store/useTalentBossStore";
import { TextInput, View } from "react-native";

export default function SearchBar() {
	const input = useTalentBossMaterialsStore((state) => state.input);
	const setInput = useTalentBossMaterialsStore((state) => state.setInput);

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
