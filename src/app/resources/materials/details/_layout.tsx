import { Stack } from "expo-router";

export default function DetailsStack() {
	return (
		<Stack
			screenOptions={{
				title: "Details",
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="weapon/experience/[id]" />
			<Stack.Screen name="weapon/ascension/[id]" />
			<Stack.Screen name="talent/boss/[id]" />
			<Stack.Screen name="talent/book/[id]" />
			<Stack.Screen name="local/[id]" />
			<Stack.Screen name="cooking/[id]" />
			<Stack.Screen name="character/ascension/character/[id]" />
			<Stack.Screen name="character/ascension/common/[id]" />
			<Stack.Screen name="character/experience/[id]" />
		</Stack>
	);
}
