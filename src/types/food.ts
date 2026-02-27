export type FoodApi = {
	name: string;
	type: string;
	rarity: number;
};

export type food = FoodApi & {
	id: string;
};
