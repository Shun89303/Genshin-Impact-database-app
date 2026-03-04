import { Character } from "@/src/types/character";
import { FlatList, View } from "react-native";
import CharacterImage from "./characterImage";
import styles from "./searchList.styles";

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
				keyExtractor={(item) => item.id}
				numColumns={3}
				initialNumToRender={9}
				windowSize={15}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				showsVerticalScrollIndicator={false}
				columnWrapperStyle={styles.row}
				contentContainerStyle={styles.content}
				renderItem={({ item }) => (
					<View style={styles.item}>
						<CharacterImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
