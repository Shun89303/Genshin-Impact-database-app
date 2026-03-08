import { endpoints } from "@/src/api/endpoints";
import Divider from "@/src/components/common/Divider";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import React, { useState } from "react";
import {
	Dimensions,
	RefreshControl,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import CharacterConstellations from "./characterConstellations";
import CharacterGallery from "./characterGallery";
import CharacterOverview from "./characterOverview";
import CharacterTabs, { Tab } from "./characterTabs";
import ExpandableHorizontalList from "./expandableHorizontalList";

export default function CharacterDetails({
	character,
	refreshing,
	onRefresh,
}: {
	character: Character;
	refreshing: boolean;
	onRefresh: () => void;
}) {
	const [activeTab, setActiveTab] = useState<Tab>("Overview");
	const screenWidth = Dimensions.get("window").width;
	const { characters } = endpoints;

	const skillImages = [
		character.images.talentNa,
		character.images.talentSkill,
		character.images.talentBurst,
	];

	const passiveImages = [
		character.images.talentPassive0,
		character.images.talentPassive1,
		character.images.talentPassive2,
	];

	const constellationImages = [
		character.images.constellation1,
		character.images.constellation2,
		character.images.constellation3,
		character.images.constellation4,
		character.images.constellation5,
		character.images.constellation6,
	];

	const buildImageUrl = (uri: string) =>
		`${BASE_URL}${characters}/${character.id}/${uri}`;

	return (
		<View style={styles.container}>
			{/* Tab Header */}
			<View style={styles.tabsWrapper}>
				<CharacterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
			</View>

			<Divider />

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
				{/* Overview */}
				{activeTab === "Overview" && (
					<CharacterOverview character={character} screenWidth={screenWidth} />
				)}

				{/* Talents */}
				{activeTab === "Talents" && (
					<ExpandableHorizontalList
						data={character.skillTalents ?? []}
						imageUris={skillImages}
						renderImageUri={buildImageUrl}
						cardWidth={screenWidth * 0.7}
						imageSize={100}
					/>
				)}

				{/* Passives */}
				{activeTab === "Passives" && (
					<ExpandableHorizontalList
						data={character.passiveTalents ?? []}
						imageUris={passiveImages}
						renderImageUri={buildImageUrl}
						cardWidth={screenWidth * 0.6}
						imageSize={80}
					/>
				)}

				{/* Constellations */}
				{activeTab === "Constellations" && (
					<CharacterConstellations
						data={character.constellations}
						imageUris={constellationImages}
						renderImageUri={buildImageUrl}
						cardWidth={screenWidth * 0.6}
						imageSize={80}
					/>
				)}

				{/* Gallery */}
				{activeTab === "Gallery" && (
					<CharacterGallery
						character={character}
						cardWidth={screenWidth * 0.6}
					/>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8FAFC",
	},

	tabsWrapper: {
		paddingTop: 12,
		paddingHorizontal: 12,
	},

	scrollContainer: {
		flex: 1,
	},

	scrollContent: {
		paddingVertical: 16,
		paddingHorizontal: 12,
		gap: 24, // consistent spacing between sections
	},
});
