import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

export default function CharacterImage({ id }: { id: string }) {
	const [loading, setLoading] = useState(true);

	const chaURL = endpoints.characters;
	const icon = endpoints.icon;

	return (
		<>
			{loading && <ActivityIndicator />}
			<Image
				source={{
					uri: `${BASE_URL}${chaURL}/${id}${icon}`,
				}}
				cachePolicy={"memory-disk"}
				onLoad={() => setLoading(false)}
				style={{ width: 25, height: 50, margin: 4 }}
			/>
		</>
	);
}
