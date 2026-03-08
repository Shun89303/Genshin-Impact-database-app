import { useRef } from "react";
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function ErrorState({
	message,
	onRetry,
}: {
	message: string;
	onRetry: () => void;
}) {
	const scaleAnim = useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scaleAnim, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scaleAnim, {
			toValue: 1,
			friction: 3,
			useNativeDriver: true,
		}).start();
		onRetry();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.errorText}>Error: {message}</Text>
			<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
				<TouchableOpacity
					style={styles.button}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					activeOpacity={0.8} // subtle opacity feedback
					hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
				>
					<Text style={styles.buttonText}>Retry</Text>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	errorText: {
		fontSize: 20,
		fontWeight: "600",
		color: "#d93025",
		textAlign: "center",
		marginBottom: 24,
	},
	button: {
		backgroundColor: "#d93025",
		paddingVertical: 14,
		paddingHorizontal: 36,
		borderRadius: 12,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "700",
		fontSize: 16,
		textAlign: "center",
	},
});
