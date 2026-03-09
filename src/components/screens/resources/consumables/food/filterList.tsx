import { endpoints } from "@/src/api/endpoints";
import PressableImage from "@/src/components/common/PressableImage";
import { BASE_URL } from "@/src/config/env";
import { NormalizedFood } from "@/src/types/food";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: NormalizedFood[] | { label: string; data: NormalizedFood[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	const { consumables, food } = endpoints;
	const router = useRouter();

	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as { label: string; data: NormalizedFood[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={12}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={styles.contentContainer}
				renderItem={({ item }) => (
					<View style={styles.section}>
						<Text style={styles.title}>{item.label}</Text>

						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(food) => food.id}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.horizontalList}
							renderItem={({ item }) => (
								<PressableImage
									uri={`${BASE_URL}${consumables}${food}/${item.id}`}
									aspectRatio={1}
									onPress={() =>
										router.navigate({
											pathname: "/resources/consumables/foods/[id]",
											params: { id: item.id },
										})
									}
								/>
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
	},

	contentContainer: {
		paddingVertical: 20,
		gap: 28,
	},

	section: {
		paddingHorizontal: 20,
		gap: 12,
	},

	title: {
		fontSize: 20,
		fontWeight: "700",
	},

	horizontalList: {
		gap: 12,
	},
});
