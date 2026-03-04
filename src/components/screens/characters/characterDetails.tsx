import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Character } from "@/src/types/character";
import React, { useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type Tab = "Overview" | "Talents" | "Passives" | "Constellations" | "Gallery";

export default function CharacterDetails({
	character,
}: {
	character: Character;
}) {
	const [activeTab, setActiveTab] = useState<Tab>("Overview");
	const [expandedSkill, setExpandedSkill] = useState<number | null>(null);
	const [expandedPassive, setExpandedPassive] = useState<number | null>(null);

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

	return (
		<View style={{ flex: 1 }}>
			{/* Tab Header */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					paddingVertical: 10,
					backgroundColor: "#eee",
				}}
			>
				{["Overview", "Talents", "Passives", "Constellations", "Gallery"].map(
					(tab) => (
						<TouchableOpacity
							key={tab}
							onPress={() => setActiveTab(tab as Tab)}
						>
							<Text
								style={{ fontWeight: activeTab === tab ? "bold" : "normal" }}
							>
								{tab}
							</Text>
						</TouchableOpacity>
					)
				)}
			</View>

			<ScrollView style={{ flex: 1 }}>
				{/* Overview */}
				{activeTab === "Overview" && (
					<View style={{ alignItems: "center", padding: 16 }}>
						<Image
							source={{
								uri: `${BASE_URL}${characters}/${character.id}/${character.images.portrait}`,
							}}
							style={{
								width: screenWidth * 0.6,
								height: screenWidth * 0.6,
								borderRadius: 12,
							}}
							resizeMode="contain"
						/>
						<Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
							{character.name}
						</Text>
						<Text style={{ fontSize: 16, fontStyle: "italic" }}>
							{character.title}
						</Text>
						<Text style={{ marginTop: 8, textAlign: "center" }}>
							{character.description}
						</Text>

						<View style={{ flexDirection: "row", marginTop: 16 }}>
							<Image
								source={{
									uri: `${BASE_URL}${characters}/${character.id}/${character.images.icon}`,
								}}
								style={{ width: 40, height: 40, margin: 4 }}
							/>
							<Image
								source={{
									uri: `${BASE_URL}${characters}/${character.id}/${character.images.iconBig}`,
								}}
								style={{ width: 40, height: 40, margin: 4 }}
							/>
							<Image
								source={{
									uri: `${BASE_URL}${characters}/${character.id}/${character.images.iconSide}`,
								}}
								style={{ width: 40, height: 40, margin: 4 }}
							/>
						</View>
					</View>
				)}

				{/* Talents */}
				{activeTab === "Talents" && (
					<FlatList
						horizontal
						data={character.skillTalents}
						keyExtractor={(item) => item.name}
						contentContainerStyle={{ padding: 16 }}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() =>
									setExpandedSkill(expandedSkill === index ? null : index)
								}
								style={{
									width: screenWidth * 0.7,
									marginRight: 16,
									borderRadius: 12,
									backgroundColor: "#f5f5f5",
									padding: 12,
									alignItems: "center",
								}}
							>
								<Image
									source={{
										uri: `${BASE_URL}${characters}/${character.id}/${skillImages[index]}`,
									}}
									style={{ width: 100, height: 100 }}
									resizeMode="contain"
								/>
								<Text style={{ fontWeight: "bold", marginTop: 8 }}>
									{item.name}
								</Text>
								{expandedSkill === index && (
									<Text style={{ marginTop: 4, textAlign: "center" }}>
										{item.description}
									</Text>
								)}
							</TouchableOpacity>
						)}
					/>
				)}

				{/* Passives */}
				{activeTab === "Passives" && (
					<FlatList
						horizontal
						data={character.passiveTalents}
						keyExtractor={(item) => item.name}
						contentContainerStyle={{ padding: 16 }}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() =>
									setExpandedPassive(expandedPassive === index ? null : index)
								}
								style={{
									width: screenWidth * 0.6,
									marginRight: 16,
									borderRadius: 12,
									backgroundColor: "#f0f0f0",
									padding: 12,
									alignItems: "center",
								}}
							>
								<Image
									source={{
										uri: `${BASE_URL}${characters}/${character.id}/${passiveImages[index]}`,
									}}
									style={{ width: 80, height: 80 }}
									resizeMode="contain"
								/>
								<Text style={{ fontWeight: "bold", marginTop: 8 }}>
									{item.name}
								</Text>
								{expandedPassive === index && (
									<Text style={{ marginTop: 4, textAlign: "center" }}>
										{item.description}
									</Text>
								)}
							</TouchableOpacity>
						)}
					/>
				)}

				{/* Constellations */}
				{activeTab === "Constellations" && (
					<FlatList
						horizontal
						data={character.constellations}
						keyExtractor={(item) => item.name}
						contentContainerStyle={{ padding: 16 }}
						renderItem={({ item, index }) => (
							<View
								style={{
									width: screenWidth * 0.6,
									marginRight: 16,
									borderRadius: 12,
									padding: 12,
									backgroundColor: "#e0e0e0",
									alignItems: "center",
								}}
							>
								<Image
									source={{
										uri: `${BASE_URL}${characters}/${character.id}/${constellationImages[index]}`,
									}}
									style={{ width: 80, height: 80 }}
									resizeMode="contain"
								/>
								<Text style={{ fontWeight: "bold", marginTop: 8 }}>
									{item.name}
								</Text>
								<Text style={{ textAlign: "center", marginTop: 4 }}>
									{item.description}
								</Text>
							</View>
						)}
					/>
				)}

				{/* Gallery */}
				{activeTab === "Gallery" && (
					<ScrollView horizontal contentContainerStyle={{ padding: 16 }}>
						{[
							character.images.card,
							character.images.gachaCard,
							character.images.gachaSplash,
							character.images.namecardBackground,
						].map((uri, idx) => (
							<Image
								key={idx}
								source={{
									uri: `${BASE_URL}${characters}/${character.id}/${uri}`,
								}}
								style={{
									width: screenWidth * 0.6,
									height: screenWidth * 0.6,
									marginRight: 16,
									borderRadius: 12,
								}}
								resizeMode="contain"
							/>
						))}
					</ScrollView>
				)}
			</ScrollView>
		</View>
	);
}
