export type CraftingItem = {
	item: string;
	quantity: number;
};

export type Potion = {
	name: string;
	effect: string;
	rarity: 1 | 2 | 3 | 4 | 5;
	crafting: CraftingItem[];
};

export type NormalizedPotion = Potion & {
	id: string;
};
