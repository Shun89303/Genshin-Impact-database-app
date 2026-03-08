import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export type Tab =
	| "Overview"
	| "Talents"
	| "Passives"
	| "Constellations"
	| "Gallery";

export default function CharacterTabs({
	activeTab,
	setActiveTab,
}: {
	activeTab: Tab;
	setActiveTab: (tab: Tab) => void;
}) {
	const tabs: Tab[] = [
		"Overview",
		"Talents",
		"Passives",
		"Constellations",
		"Gallery",
	];

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			{tabs.map((tab) => {
				const isActive = activeTab === tab;
				return (
					<TouchableOpacity
						key={tab}
						onPress={() => setActiveTab(tab)}
						style={[styles.tabButton, isActive && styles.activeTabButton]}
						activeOpacity={0.7}
					>
						<Text style={[styles.tabText, isActive && styles.activeTabText]}>
							{tab}
						</Text>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingVertical: 10,
		paddingHorizontal: 12,
		alignItems: "center",
		gap: 8, // consistent spacing between tabs
	},

	tabButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 12,
		backgroundColor: "#F1F5F9",
		justifyContent: "center",
		alignItems: "center",
	},

	activeTabButton: {
		backgroundColor: "#007AFF",
	},

	tabText: {
		fontSize: 14,
		color: "#64748B",
		fontWeight: "500",
	},

	activeTabText: {
		color: "#FFFFFF",
		fontWeight: "600",
	},
});
