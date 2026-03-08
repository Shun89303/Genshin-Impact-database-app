import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Weapon } from "@/src/types/weapon";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import PressableImage from "../../common/PressableImage";

export default function SearchList({
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
		<View style={{ flex: 1, alignItems: "center" }}>
			<FlatList
				data={finalData as Weapon[]}
				initialNumToRender={15}
				windowSize={21}
				removeClippedSubviews
				numColumns={3}
				onRefresh={onRefresh}
				refreshing={refreshing}
				contentContainerStyle={{ paddingBottom: 20 }}
				renderItem={({ item }) => (
					<View style={{ justifyContent: "space-evenly", padding: 10 }}>
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
					</View>
				)}
			/>
		</View>
	);
}
