import { View } from "react-native";
import CharacterRow from "./characterRow";
import MaterialsImage from "./materialsImage";

export default function MaterialContainer({
	id,
	characters,
}: {
	id: string;
	characters: string[];
}) {
	return (
		<View style={{ margin: 10, width: 100 }}>
			<MaterialsImage id={id} />
			<CharacterRow characters={characters} />
		</View>
	);
}
