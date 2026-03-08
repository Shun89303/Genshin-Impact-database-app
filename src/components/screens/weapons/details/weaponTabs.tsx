import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export type WeaponTab = "Basic Info" | "Stats & Passive";

export default function WeaponTabs({
	activeTab,
	setActiveTab,
}: {
	activeTab: WeaponTab;
	setActiveTab: (tab: WeaponTab) => void;
}) {
	const tabs: WeaponTab[] = ["Basic Info", "Stats & Passive"];

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
		paddingHorizontal: 8,
		backgroundColor: "#F8FAFC",
	},

	tabButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginRight: 8,
		borderRadius: 12,
		backgroundColor: "#F1F5F9",
		borderWidth: 1,
		borderColor: "#b2b2b2ff",
	},

	activeTabButton: {
		backgroundColor: "#3B82F6",
	},

	tabText: {
		color: "#94A3B8",
		fontWeight: "600",
		fontSize: 14,
	},

	activeTabText: {
		color: "#F1F5F9",
	},
});
