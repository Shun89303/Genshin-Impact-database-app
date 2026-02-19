import { Stack } from "expo-router";

export default function DomainsStack() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: true,
					title: "Domains",
				}}
			/>
			<Stack.Screen
				name="bosses/index"
				options={{
					title: "Bosses",
					headerBackButtonDisplayMode: "minimal",
				}}
			/>
		</Stack>
	);
}
