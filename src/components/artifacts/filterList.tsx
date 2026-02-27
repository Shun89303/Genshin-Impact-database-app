import { Artifact } from "@/src/types/artifact";
import { FlatList, Text, View } from "react-native";
import ArtifactImage from "./artifactImage";

export default function FilterList({
	finalData,
}: {
	finalData: Artifact[] | { label: string; data: Artifact[] }[];
}) {
	return (
		<View>
			<FlatList
				data={finalData as { label: string; data: Artifact[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				renderItem={({ item }) => (
					<View
						style={{
							paddingVertical: 20,
							paddingHorizontal: 25,
							gap: 10,
						}}
					>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 20,
							}}
						>
							{item.label}
						</Text>
						<FlatList
							horizontal
							data={item.data}
							keyExtractor={(char) => char.id}
							renderItem={({ item }) => <ArtifactImage id={item.id} />}
						/>
					</View>
				)}
			/>
		</View>
	);
}
