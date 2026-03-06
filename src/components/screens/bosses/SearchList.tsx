import { Boss } from "@/src/types/boss";
import { FlatList, View } from "react-native";
import BossCard from "./bossCard";

export default function SearchList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: Boss[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={finalData}
				keyExtractor={(item) => item.id}
				initialNumToRender={3}
				onRefresh={onRefresh}
				refreshing={refreshing}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <BossCard boss={item} />}
			/>
		</View>
	);
}
