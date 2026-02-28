// wam = Weapon Ascension Material

export type WAMItem = {
	id: string;
	name: string;
	rarity: number;
};

export type wamApi = {
	availability: string[];
	items: WAMItem[];
};

export type wam = wamApi & {
	id: string;
};
