import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Weapon } from "@/src/types/weapon";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles/weaponDetails.styles";
import WeaponBasicInfo from "./weaponBasicInfo";
import WeaponImageFallback from "./weaponImageFallback";
import WeaponStats from "./weaponStats";
import WeaponTabs, { WeaponTab } from "./weaponTabs";

export default function WeaponDetails({ weapon }: { weapon: Weapon }) {
	const [activeTab, setActiveTab] = useState<WeaponTab>("Basic Info");
	const { weapons, icon } = endpoints;

	const weaponImageUrl = `${BASE_URL}${weapons}/${weapon.id}${icon}`;

	return (
		<View style={styles.container}>
			{/* Weapon Icon */}
			<View style={styles.imageContainer}>
				<WeaponImageFallback
					uri={weaponImageUrl}
					style={{ width: 140, height: 140 }}
				/>
			</View>

			<View
				style={{ height: 1, backgroundColor: "#334155", marginVertical: 12 }}
			/>

			{/* Tab Header */}
			<View style={styles.tabHeader}>
				<WeaponTabs activeTab={activeTab} setActiveTab={setActiveTab} />
			</View>

			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{activeTab === "Basic Info" && <WeaponBasicInfo weapon={weapon} />}
				{activeTab === "Stats & Passive" && <WeaponStats weapon={weapon} />}
			</ScrollView>
		</View>
	);
}
