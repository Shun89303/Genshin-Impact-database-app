import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import PressableImage from "../../common/PressableImage";
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
	const router = useRouter();
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
						<PressableImage
							uri={`${BASE_URL}${endpoints.characters}/${item.id}${endpoints.card}`}
							onPress={() =>
								router.navigate({
									pathname: "/characters/[id]",
									params: { id: item.id },
								})
							}
						/>
					</View>
				)}
			/>
		</View>
	);
}
