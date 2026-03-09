import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Artifact } from "@/src/types/artifact";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PressableImage from "../../common/PressableImage";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Artifact[] | { label: string; data: Artifact[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	const { artifacts, circletOfLogos } = endpoints;
	const router = useRouter();
	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as { label: string; data: Artifact[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={15}
				windowSize={21}
				removeClippedSubviews
				onRefresh={onRefresh}
				refreshing={refreshing}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>{item.label}</Text>
						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(art) => art.id}
							renderItem={({ item }) => (
								<PressableImage
									uri={`${BASE_URL}${artifacts}/${item.id}${circletOfLogos}`}
									onPress={() =>
										router.navigate({
											pathname: "/artifacts/[id]",
											params: { id: item.id },
										})
									}
									aspectRatio={1}
								/>
							)}
							contentContainerStyle={styles.horizontalList}
							showsHorizontalScrollIndicator={false}
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
		backgroundColor: "#F8FAFC",
	},

	listContent: {
		paddingVertical: 12,
	},

	section: {
		paddingVertical: 20,
		paddingHorizontal: 16,
	},

	sectionTitle: {
		fontWeight: "700",
		fontSize: 20,
		color: "#000000ff",
		marginBottom: 12,
	},

	horizontalList: {
		gap: 12,
		paddingHorizontal: 4,
	},
});
