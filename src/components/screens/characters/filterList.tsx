import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PressableImage from "../../common/PressableImage";

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 8,
	},

	contentContainer: {
		paddingBottom: 24,
		gap: 16,
	},

	groupContainer: {
		gap: 12,
		borderWidth: 1,
		borderColor: "#E6ECF3", // soft light border
		borderRadius: 12, // rounded corners
		padding: 12, // add inner spacing
		backgroundColor: "#F8FAFC", // soft background
	},

	groupTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#000000ff",
	},

	horizontalList: {
		paddingVertical: 8,
		gap: 12,
	},

	characterWrapper: {
		marginRight: 12,
	},
});
