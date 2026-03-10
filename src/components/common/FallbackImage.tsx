import { Image } from "expo-image";
import { useState } from "react";
import {
	ImageStyle,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import ScreenLoader from "./ScreenLoader";

type FallbackImageProps = {
	uri: string;
	style?: ViewStyle;
	imageStyle?: ImageStyle;
	loaderStyle?: ViewStyle;
	fallbackStyle?: ViewStyle;
	fallbackTextStyle?: TextStyle;
	loader?: React.ReactNode;
	borderRadius?: number; // optional rounding
	borderColor?: string; // optional border color
	backgroundColor?: string; // optional image bg
};

export default function FallbackImage({
	uri,
	style,
	loaderStyle,
	fallbackTextStyle,
	loader,
	borderRadius = 12,
	borderColor = "#E6ECF3",
	backgroundColor = "#F8FAFC",
}: FallbackImageProps) {
	const [failed, setFailed] = useState(false);
	const [loading, setLoading] = useState(true);

	if (failed) {
		return (
			<View
				style={[
					style,
					styles.unavailable,
					{ borderRadius, borderWidth: 1, borderColor, backgroundColor },
				]}
			>
				<Text style={[styles.unavailableText, fallbackTextStyle]}>
					Image Unavailable
				</Text>
			</View>
		);
	}

	return (
		<View
			style={[
				style,
				{
					borderRadius,
					borderWidth: 1,
					borderColor,
					backgroundColor,
					overflow: "hidden",
				},
			]}
		>
			<Image
				source={{ uri }}
				style={StyleSheet.absoluteFill}
				contentFit="contain"
				cachePolicy="memory-disk"
				onLoad={() => setLoading(false)}
				onError={() => {
					setLoading(false);
					setFailed(true);
				}}
			/>

			{loading && (
				<View style={[styles.loader, loaderStyle]}>
					{loader ?? <ScreenLoader />}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	loader: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.5)", // subtle overlay
		borderRadius: 12,
	},

	unavailable: {
		justifyContent: "center",
		alignItems: "center",
	},

	unavailableText: {
		color: "#64748B",
		fontSize: 12,
		textAlign: "center",
	},
});
