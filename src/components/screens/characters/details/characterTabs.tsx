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
		paddingVertical: 12,
		paddingHorizontal: 8,
		backgroundColor: "#f5f5f5",
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		alignItems: "center",
	},
	tabButton: {
		paddingVertical: 6,
		paddingHorizontal: 14,
		borderRadius: 8,
		marginRight: 8,
		alignSelf: "center",
	},
	activeTabButton: {
		backgroundColor: "#007aff",
	},
	tabText: {
		fontSize: 14,
		color: "#555",
	},
	activeTabText: {
		fontWeight: "bold",
		color: "#fff",
	},
});
