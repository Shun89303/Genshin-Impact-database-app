import { FlatList, View } from "react-native";
import { Artifact } from "../../../src/types/artifact";
import ArtifactImage from "./artifactImage";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Artifact[] | { label: string; data: Artifact[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as Artifact[]}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
						<ArtifactImage id={item.id} />
					</View>
				)}
			/>
		</View>
	);
}
