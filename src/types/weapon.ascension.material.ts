// wam = Weapon Ascension Material

export type wamApi = {
	availability: string[];
};

export type wam = wamApi & {
	name: string;
};
