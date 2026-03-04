import { Character } from "@/src/types/character";
import { FlatList, Text, View } from "react-native";
import CharacterImage from "./characterImage";
import styles from "./filterList.styles";

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
		<View style={styles.container}>
			<FlatList
				data={finalData as { label: string; data: Character[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={9}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.contentContainer}
				renderItem={({ item }) => (
					<View style={styles.groupContainer}>
						<Text style={styles.groupTitle}>{item.label}</Text>
						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(char) => char.id}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.horizontalList}
							renderItem={({ item }) => (
								<View style={styles.characterWrapper}>
									<CharacterImage id={item.id} />
								</View>
							)}
						/>
					</View>
				)}
			/>
		</View>
	);
}
