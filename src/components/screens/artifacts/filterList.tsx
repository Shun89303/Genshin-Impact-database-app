import { Artifact } from "@/src/types/artifact";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ArtifactImage from "./artifactImage";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Artifact[] | { label: string; data: Artifact[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={styles.container}>
			<FlatList
				data={finalData as { label: string; data: Artifact[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={15}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>{item.label}</Text>
						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(art) => art.id}
							renderItem={({ item }) => <ArtifactImage id={item.id} />}
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
		backgroundColor: "#0F172A", // matches Artifacts screen background
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
		color: "#F9FAFB",
		marginBottom: 12,
	},

	horizontalList: {
		gap: 12,
		paddingHorizontal: 4,
	},
});
