import { TalentBook } from "@/src/types/talent.book";
import { FlatList, Text, View } from "react-native";
import MaterialsImage from "./materialsImage";

export default function FilterList({
	finalData,
	refreshing,
	onRefresh,
}: {
	finalData: TalentBook[] | { label: string; data: TalentBook[] }[];
	refreshing: boolean;
	onRefresh: any;
}) {
	return (
		<View>
			<FlatList
				data={finalData as { label: string; data: TalentBook[] }[]}
				keyExtractor={(item) => item.label}
				initialNumToRender={12}
				windowSize={21}
				removeClippedSubviews
				refreshing={refreshing}
				onRefresh={onRefresh}
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
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<>
									{item.items.map((book) => (
										<View
											key={book.id}
											style={{ justifyContent: "space-evenly", padding: 10 }}
										>
											<MaterialsImage id={book.id} />
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
