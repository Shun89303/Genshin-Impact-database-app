import { Normalized } from "@/src/types/weapon.ascension.material";
import { FlatList, StyleSheet, View } from "react-native";
import MaterialCard from "./materialCard";

interface Props {
	finalData: Normalized[] | { label: string; data: Normalized[] }[];
	refreshing: boolean;
	onRefresh: () => void;
}

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: Props) {
	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as Normalized[]}
				keyExtractor={(item) => item.id}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<MaterialCard
						materialName={item.id}
						items={item.items}
						availability={item.availability}
						source={item.source}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingBottom: 30,
		backgroundColor: "#f9fafb", // soft light background for contrast
	},

	listContent: {
		paddingTop: 8,
		paddingBottom: 16,
		alignItems: "center",
		gap: 12, // spacing between cards (supported in RN 0.71+)
	},
});
