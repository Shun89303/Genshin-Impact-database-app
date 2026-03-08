import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Weapon } from "@/src/types/weapon";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PressableImage from "../../common/PressableImage";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Weapon[] | { label: string; data: Weapon[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	const router = useRouter();
	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as { label: string; data: Weapon[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={15}
				windowSize={21}
				removeClippedSubviews
				contentContainerStyle={styles.listContent}
				onRefresh={onRefresh}
				refreshing={refreshing}
				renderItem={({ item }) => (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>{item.label}</Text>
						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(wea) => wea.id}
							renderItem={({ item }) => (
								<PressableImage
									uri={`${BASE_URL}${endpoints.weapons}/${item.id}${endpoints.icon}`}
									onPress={() =>
										router.navigate({
											pathname: "/weapons/[id]",
											params: { id: item.id },
										})
									}
									aspectRatio={1}
									cardStyle={{
										borderWidth: 1,
										borderColor: "#e9e9e9ff",
									}}
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
	},

	listContent: {
		paddingVertical: 12,
		gap: 16,
	},

	section: {
		paddingVertical: 20,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderRadius: 12, // rounded corners
		borderColor: "#E6ECF3", // soft light border
		padding: 12, // add inner spacing
		backgroundColor: "#F8FAFC", // soft background
	},

	sectionTitle: {
		fontWeight: "700",
		fontSize: 20,
		color: "#000000ff",
		marginBottom: 12,
	},

	horizontalList: {
		gap: 12,
		paddingVertical: 8,
	},
});
