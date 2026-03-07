import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function MaterialsImage({ id }: { id: string }) {
	const materials = endpoints.materials;
	const talentBoss = endpoints.talentBoss;

	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	function toImageId(detailId: string) {
		return detailId.replace(/'/g, "-");
	}

	if (failed) {
		return (
			<View
				style={{
					width: 100,
					height: 100,
					margin: 4,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>Image failed</Text>
			</View>
		);
	}

	return (
		<>
			{loading && <ActivityIndicator />}
			<Image
				source={{
					uri: `${BASE_URL}${materials}${talentBoss}/${toImageId(id)}`,
				}}
				style={{ width: 100, height: 100, margin: 4 }}
				cachePolicy="memory-disk"
				onLoad={() => setLoading(false)}
				onError={() => {
					setLoading(false);
					setFailed(true);
				}}
			/>
		</>
	);
}
