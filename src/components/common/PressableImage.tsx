import { Image } from "expo-image";
import { useState } from "react";
import {
	ActivityIndicator,
	ImageStyle,
	Pressable,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

type PressableImageProps = {
	uri: string;
	onPress: () => void;
	width?: number;
	aspectRatio?: number;
	cardStyle?: ViewStyle;
	imageStyle?: ImageStyle;
	loaderStyle?: ViewStyle;
	unavailableStyle?: ViewStyle;
	unavailableTextStyle?: TextStyle;
};

export default function PressableImage({
	uri,
	onPress,
	width = 100,
	aspectRatio = 0.5,
	cardStyle,
	imageStyle,
	loaderStyle,
	unavailableStyle,
	unavailableTextStyle,
}: PressableImageProps) {
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	return (
		<Pressable
			style={({ pressed }) => [
				styles.card,
				{ width },
				cardStyle,
				pressed && styles.pressed,
			]}
			onPress={onPress}
		>
			<View style={[styles.imageWrapper, { aspectRatio }, cardStyle]}>
				{!failed ? (
					<Image
						source={{ uri }}
						style={[styles.image, imageStyle]}
						cachePolicy="memory-disk"
						onLoad={() => setLoading(false)}
						onError={() => {
							setLoading(false);
							setFailed(true);
						}}
					/>
				) : (
					<View style={[styles.unavailable, unavailableStyle]}>
						<Text style={[styles.unavailableText, unavailableTextStyle]}>
							Image Unavailable
						</Text>
					</View>
				)}

				{loading && !failed && (
					<View style={[styles.loaderOverlay, loaderStyle]}>
						<ActivityIndicator size="small" />
					</View>
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 14,
		overflow: "hidden",
		backgroundColor: "#F8FAFC",
	},

	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.98 }],
	},

	imageWrapper: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#E6ECF3",
		borderRadius: 14,
	},

	image: {
		width: "100%",
		height: "100%",
	},

	loaderOverlay: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
	},

	unavailable: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E6ECF3",
	},

	unavailableText: {
		color: "#64748B",
		fontSize: 12,
		textAlign: "center",
	},
});
