import { endpoints } from "@/src/api/endpoints";
import PressableImage from "@/src/components/common/PressableImage";
import { BASE_URL } from "@/src/config/env";
import { Normalized } from "@/src/types/weapon.ascension.material";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Normalized[] | { label: string; data: Normalized[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	const { materials, weaponAscension } = endpoints;
	const router = useRouter();

	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as { label: string; data: Normalized[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 20,
				}}
				renderItem={({ item }) => (
					<View style={styles.groupCard}>
						<Text style={styles.groupTitle}>{item.label}</Text>
						<FlatList
							horizontal
							showsHorizontalScrollIndicator={false}
							data={item.data}
							keyExtractor={(item) => item.id}
							contentContainerStyle={styles.materialsList}
							renderItem={({ item }) => (
								<>
									{item.items.map((materialItem) => (
										<View key={materialItem.id} style={styles.materialCard}>
											<PressableImage
												uri={`${BASE_URL}${materials}${weaponAscension}/${materialItem.id}`}
												onPress={() =>
													router.navigate({
														pathname:
															"/resources/materials/details/weapon/ascension/[id]",
														params: { id: materialItem.id },
													})
												}
												aspectRatio={1}
												width={55}
											/>
										</View>
									))}
								</>
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
		paddingHorizontal: 16,
		paddingTop: 8,
		backgroundColor: "#F9F9F9",
	},
	groupCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		paddingVertical: 15,
		paddingHorizontal: 20,
		marginVertical: 8,
		borderWidth: 1,
		// borderColor: "#E0E0E0",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	groupTitle: {
		fontWeight: "700",
		fontSize: 18,
		marginBottom: 10,
		color: "#333333",
	},
	materialsList: {
		gap: 12,
		paddingVertical: 5,
	},
	materialCard: {
		justifyContent: "center",
		alignItems: "center",
		padding: 8,
		// backgroundColor: "#FAFAFA",
		borderRadius: 8,
		// borderWidth: 1,
		// borderColor: "#E0E0E0",
		marginRight: 10,
	},
});
