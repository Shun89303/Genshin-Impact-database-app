import { ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "./styles/weaponTabs.styles";

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
