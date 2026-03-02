import { FlatList, Text, View } from "react-native";
import { Character } from "../../../src/types/character";
import CharacterImage from "./characterImage";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Character[] | { label: string; data: Character[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View>
			<FlatList
				data={finalData as { label: string; data: Character[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={9}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<View
						style={{
							paddingVertical: 20,
							paddingHorizontal: 25,
							gap: 10,
						}}
					>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 20,
							}}
						>
							{item.label}
						</Text>
						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(char) => char.id}
							renderItem={({ item }) => <CharacterImage id={item.id} />}
						/>
					</View>
				)}
			/>
		</View>
	);
}
