import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";

export default function MaterialsImage({ id }: { id: any }) {
	const materials = endpoints.materials;
	const weaponAscension = endpoints.weaponAscension;
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	return (
		<>
			<Pressable
				onPress={() =>
					router.replace({
						pathname: "/resources/materials/details/weapon/ascension/[id]",
						params: { id },
					})
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: `${BASE_URL}${materials}${weaponAscension}/${id}` }}
					style={{
						width: 70,
						height: 70,
						margin: 4,
						resizeMode: "contain",
					}}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
				/>
			</Pressable>
		</>
	);
}
