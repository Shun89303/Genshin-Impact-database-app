import { endpoints } from "@/src/api/endpoints";
import Divider from "@/src/components/common/Divider";
import FallbackImage from "@/src/components/common/FallbackImage";
import { BASE_URL } from "@/src/config/env";
import { Weapon } from "@/src/types/weapon";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import WeaponBasicInfo from "./weaponBasicInfo";
import WeaponStats from "./weaponStats";
import WeaponTabs, { WeaponTab } from "./weaponTabs";

export default function WeaponDetails({
	weapon,
	refreshing,
	onRefresh,
}: {
	weapon: Weapon;
	refreshing: boolean;
	onRefresh: () => void;
}) {
	const [activeTab, setActiveTab] = useState<WeaponTab>("Basic Info");
	const { weapons, icon } = endpoints;

	const weaponImageUrl = `${BASE_URL}${weapons}/${weapon.id}${icon}`;

	return (
		<View style={styles.container}>
			{/* Weapon Icon */}
			<View style={styles.imageContainer}>
				<FallbackImage
					uri={weaponImageUrl}
					style={styles.weaponImage}
					borderColor="#a7a7a7ff"
				/>
			</View>

			<Divider />

			{/* Tab Header */}
			<View style={styles.tabHeader}>
				<WeaponTabs activeTab={activeTab} setActiveTab={setActiveTab} />
			</View>

			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={["#000000ff"]} // Android
					/>
				}
			>
				{activeTab === "Basic Info" && <WeaponBasicInfo weapon={weapon} />}
				{activeTab === "Stats & Passive" && <WeaponStats weapon={weapon} />}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8FAFC",
	},

	imageContainer: {
		alignItems: "center",
		marginTop: 24,
	},

	weaponImage: {
		width: 150,
		height: 150,
		borderRadius: 16,
	},

	tabHeader: {
		flexShrink: 0,
		marginBottom: 20,
	},

	scrollContainer: {
		flex: 1,
		paddingHorizontal: 16,
	},

	scrollContent: {
		paddingBottom: 40,
	},
});
