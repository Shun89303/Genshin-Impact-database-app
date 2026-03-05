import { ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "./styles/characterTabs.styles";

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
