import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

export default function MaterialsImage({ id }: any) {
	const materials = endpoints.materials;
	const characterExperience = endpoints.characterExperience;
	const [loading, setLoading] = useState(true);

	return (
		<>
			{loading && <ActivityIndicator />}
			<Image
				source={{
					uri: `${BASE_URL}${materials}${characterExperience}/${id}`,
				}}
				style={{ width: 100, height: 100, margin: 4 }}
				cachePolicy="memory-disk"
				onLoad={() => setLoading(false)}
			/>
		</>
	);
}
