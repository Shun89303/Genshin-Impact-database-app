import { Character } from "@/src/types/character";
import { FlatList, View } from "react-native";
import CharacterImage from "./characterImage";
import styles from "./styles/searchList.styles";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Character[] | { label: string; data: Character[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as Character[]}
				numColumns={3}
				initialNumToRender={9}
				showsVerticalScrollIndicator={false}
				columnWrapperStyle={styles.row}
				contentContainerStyle={styles.content}
				onRefresh={onRefresh}
				refreshing={refreshing}
				renderItem={({ item }) => (
					<View style={styles.item}>
						<CharacterImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
