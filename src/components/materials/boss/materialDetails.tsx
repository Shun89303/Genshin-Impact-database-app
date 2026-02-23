import { useBossMaterialsStore } from "@/src/store/useBossMaterialsStore";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "../../styles.modules";

export default function MaterialDetails({
	field,
	value,
}: {
	field: string;
	value: any;
}) {
	const error = useBossMaterialsStore((state) => state.error);

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<Text>{error}</Text>
			</View>
		);
	}

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
				<Text>{field}: </Text>
				<Text>
					{typeof value === "object"
						? JSON.stringify(value, null, 2)
						: String(value)}
				</Text>
			</View>
		</View>
	);
}
