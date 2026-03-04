// Base reusable types
export type ValueItem = {
	name: string;
	value: string | number;
};

export type AttributeScaling = {
	name: string;
	value: string;
};

export type SkillTalent = {
	name: string;
	unlock: string;
	description: string;
	upgrades: ValueItem[];
	type: "NORMAL_ATTACK" | "ELEMENTAL_SKILL" | "ELEMENTAL_BURST";
	"attribute-scaling": AttributeScaling[];
};

export type PassiveTalent = {
	name: string;
	unlock: string;
	description: string;
	level?: number;
};

export type Constellation = {
	name: string;
	unlock: string;
	description: string;
	level: number;
};

export type AscensionLevel =
	| "level_20"
	| "level_40"
	| "level_50"
	| "level_60"
	| "level_70"
	| "level_80";

export type AscensionMaterials = {
	[key in AscensionLevel]: ValueItem[];
};

export interface CharacterImageAssets {
	card: string;
	constellation: string;
	constellation1: string;
	constellation2: string;
	constellation3: string;
	constellation4: string;
	constellation5: string;
	constellation6: string;
	constellationShape: string;
	gachaCard: string;
	gachaSplash: string;
	icon: string;
	iconBig: string;
	iconSide: string;
	namecardBackground: string;
	portrait: string;
	talentBurst: string;
	talentNa: string;
	talentPassive0: string;
	talentPassive1: string;
	talentPassive2: string;
	talentSkill: string;
}

// Main character type
export type Character = {
	id: string;
	name: string;
	title: string;
	vision: "Geo" | "Anemo" | "Electro" | "Dendro" | "Hydro" | "Pyro" | "Cryo";
	vision_key: Uppercase<Character["vision"]>;
	weapon: "Sword" | "Claymore" | "Polearm" | "Bow" | "Catalyst";
	weapon_type: Uppercase<Character["weapon"]>;
	gender: "Male" | "Female";
	nation: string;
	affiliation: string;
	rarity: 4 | 5;
	release: string; // YYYY-MM-DD
	constellation: string;
	birthday: string; // YYYY-MM-DD
	description: string;

	skillTalents: SkillTalent[];
	passiveTalents: PassiveTalent[];
	constellations: Constellation[];
	ascension_materials: AscensionMaterials;

	images: CharacterImageAssets;
};

export type ApiIds = string[];
