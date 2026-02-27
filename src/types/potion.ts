export type PotionApi = {
	name: string;
	rarity: number;
};

export type potion = PotionApi & {
	id: string;
};
