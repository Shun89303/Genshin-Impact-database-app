import { useElementsStore } from "@/src/store/useElementsStore";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "../../styles.modules";

export default function ElementDetails({
	field,
	value,
}: {
	field: string;
	value: any;
}) {
	const { error } = useElementsStore();

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
