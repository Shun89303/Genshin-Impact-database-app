import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import React, { useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import CharacterConstellations from "./characterConstellations";
import CharacterGallery from "./characterGallery";
import CharacterOverview from "./characterOverview";
import CharacterTabs, { Tab } from "./characterTabs";
import ExpandableHorizontalList from "./expandableHorizontalList";
import styles from "./styles/characterDetails.styles";

export default function CharacterDetails({
	character,
}: {
	character: Character;
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
			<View style={{ flexShrink: 0 }}>
				<CharacterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
			</View>

			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
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
