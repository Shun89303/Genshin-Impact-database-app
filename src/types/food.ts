export type RecipeItem = {
	item: string;
	quantity: number;
};

export type Food = {
	name: string;
	rarity: 1 | 2 | 3 | 4 | 5;
	type:
		| "ATK-Boosting Dish"
		| "DEF-Boosting Dish"
		| "Recovery Dish"
		| "Adventurer's Dish";
	effect: string;
	hasRecipe: boolean;
	description: string;
	proficiency: number;
	recipe?: RecipeItem[];
};

export type NormalizedFood = Food & {
	id: string;
};
