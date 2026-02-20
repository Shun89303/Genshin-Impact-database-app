import styles from "@/src/app/artifacts/styles.modules";
import { useArtifactsStore } from "@/src/store/useArtifactsStore";
import { ActivityIndicator, Text, View } from "react-native";

export default function ArtifactDetails({
	field,
	value,
}: {
	field: string;
	value: any;
}) {
	const { error } = useArtifactsStore();

	if (error)
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);

	if (!field || !value) {
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ width: 250, marginHorizontal: "auto", paddingVertical: 5 }}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-start",
					flexWrap: "wrap",
				}}
			>
				<Text style={{ fontWeight: "bold", marginRight: 5 }}>{field}: </Text>
				<Text style={{ flexShrink: 1 }}>
					{typeof value === "object"
						? JSON.stringify(value, null, 2)
						: String(value)}
				</Text>
			</View>
		</View>
	);
}
