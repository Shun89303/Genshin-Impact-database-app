import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";

export default function MaterialsImage({ id }: any) {
	const materials = endpoints.materials;
	const characterAscension = endpoints.characterAscension;
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	return (
		<>
			<Pressable
				onPress={() =>
					router.replace({
						pathname:
							"/resources/materials/details/character/ascension/character/[id]",
						params: { id },
					})
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: `${BASE_URL}${materials}${characterAscension}/${id}` }}
					style={{ width: 100, height: 100, margin: 4 }}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
				/>
			</Pressable>
		</>
	);
}
