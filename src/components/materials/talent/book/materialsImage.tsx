import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";

export default function MaterialsImage({ id }: any) {
	const materials = endpoints.materials;
	const talentBook = endpoints.talentBook;
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	return (
		<>
			<Pressable
				onPress={() =>
					router.replace({
						pathname: "/resources/materials/details/talent/book/[id]",
						params: { id },
					})
				}
			>
				{loading && <ActivityIndicator />}
				<Image
					source={{ uri: `${BASE_URL}${materials}${talentBook}/${id}` }}
					style={{ width: 100, height: 100, margin: 4 }}
					cachePolicy="memory-disk"
					onLoad={() => setLoading(false)}
				/>
			</Pressable>
		</>
	);
}
