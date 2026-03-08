import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";
import PressableImage from "../../common/PressableImage";
import styles from "./styles/filterList.styles";

export default function FilterList({
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
				data={finalData as { label: string; data: Character[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={9}
				windowSize={21}
				removeClippedSubviews
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.contentContainer}
				onRefresh={onRefresh}
				refreshing={refreshing}
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
				)}
			/>
		</View>
	);
}
