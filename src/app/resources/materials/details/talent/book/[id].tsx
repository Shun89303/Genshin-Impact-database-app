import MaterialDetails from "@/src/components/screens/resources/materials/talent/book/details/materialDetails";
import styles from "@/src/components/styles.modules";
import { useBookTalentMaterials } from "@/src/hooks/useMaterials.talent.book";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TalentBookMaterialsDetails() {
	const { id }: { id: any } = useLocalSearchParams();

	const { details, isLoading, isRefreshing, refetch, error } =
		useBookTalentMaterials();

	const matchedItem = details.find((mat) =>
		mat.items.find((item) => item.id === id)
	);

	if (isLoading || !matchedItem) {
		return (
			<SafeAreaView>
				<Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
					Loading Item: {id}
				</Text>
				<ActivityIndicator />
			</SafeAreaView>
		);
	}

	if (error) {
		return (
			<SafeAreaView style={styles.simpleContainer}>
				<Text>{error}</Text>
			</SafeAreaView>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<MaterialDetails
				material={matchedItem}
				refreshing={isRefreshing}
				onRefresh={refetch}
			/>
		</View>
	);
}
