export type EnhancementRarity = 1 | 2 | 3;
export type EnhancementId =
	| "enhancement-ore"
	| "fine-enhancement-ore"
	| "mystic-enhancement-ore";

export interface EnhancementItem {
	id: EnhancementId;
	name: string;
	experience: number;
	rarity: EnhancementRarity;
	source: string[];
}

export interface WeaponExperience {
	id: "weapon-experience";
	items: EnhancementItem[];
}
