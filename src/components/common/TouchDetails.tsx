import { Text } from "react-native";

export default function TouchDetails({ paddingBottom = 12 }: any) {
	return (
		<Text
			style={{
				textAlign: "center",
				color: "#334155",
				paddingBottom: paddingBottom,
				fontWeight: "300",
			}}
		>
			Touch an image to see details
		</Text>
	);
}
