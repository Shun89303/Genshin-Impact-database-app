import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { ApiItem } from "@/src/types/weapon.ascension.material";
import { Image } from "expo-image";
import { FlatList, Text, View } from "react-native";

type Props = {
	materialName: string;
	items: ApiItem[];
	weapons: string[];
	availability: string[];
	source: string;
};

export default function MaterialCard({
	materialName,
	items,
	weapons,
	availability,
	source,
}: Props) {
	const {
		materials,
		weaponAscension,
		weapons: weaponsEndpoint,
		icon,
	} = endpoints;

	return (
		<View style={{ marginBottom: 80, alignItems: "center" }}>
			<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
				{materialName}
			</Text>
			{items.length > 0 && (
				<FlatList
					data={items}
					keyExtractor={(item) => item.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<View style={{ alignItems: "center", marginRight: 8 }}>
							<Image
								style={{ width: 70, height: 70, margin: 4 }}
								contentFit="contain"
								cachePolicy="memory-disk"
								source={{
									uri: `${BASE_URL}${materials}${weaponAscension}/${item.id}`,
								}}
							/>
							<Text style={{ fontSize: 12 }}>{"★".repeat(item.rarity)}</Text>
						</View>
					)}
				/>
			)}

			{weapons.length > 0 && (
				<>
					<Text style={{ marginTop: 12, marginBottom: 6, fontWeight: "500" }}>
						Weapons
					</Text>
					<FlatList
						data={weapons}
						keyExtractor={(weaponId) => weaponId}
						horizontal
						showsHorizontalScrollIndicator={false}
						renderItem={({ item: weaponId }) => (
							<Image
								style={{ width: 50, height: 50, marginRight: 8 }}
								contentFit="contain"
								cachePolicy="memory-disk"
								source={{
									uri: `${BASE_URL}${weaponsEndpoint}/${weaponId}${icon}`,
								}}
							/>
						)}
					/>
				</>
			)}
			{availability.length > 0 && (
				<Text style={{ marginTop: 8 }}>
					Availability: {availability.join(", ")}
				</Text>
			)}
			<Text style={{ marginTop: 4 }}>Source: {source}</Text>
		</View>
	);
}
