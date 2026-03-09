import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Artifact } from "@/src/types/artifact";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import PressableImage from "../../common/PressableImage";

export default function SearchList({
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
		<View style={{ alignItems: "center" }}>
			<FlatList
				data={finalData as Artifact[]}
				initialNumToRender={6}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				onRefresh={onRefresh}
				refreshing={refreshing}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
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
					</View>
				)}
			/>
		</View>
	);
}
