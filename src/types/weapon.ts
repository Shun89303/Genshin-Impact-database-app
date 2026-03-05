export type WeaponType = "Sword" | "Claymore" | "Polearm" | "Bow" | "Catalyst";
export type WeaponRarity = 4 | 5;

export interface Weapon {
	id: string;
	name: string;
	type: WeaponType;
	rarity: WeaponRarity;
	baseAttack: number;
	subStat: string;
	passiveName: string;
	passiveDesc: string;
	location: string;
	ascensionMaterial: string;
}

export type ApiIds = string[];
