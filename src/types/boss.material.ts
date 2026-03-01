export type BossMaterialItem = {
	name: string;
	source: string;
	characters: string[];
};

export type RawBossMaterialsApi = {
	id: string;
	[key: string]: BossMaterialItem | string;
};

export type NormalizedBossMaterialGroup = BossMaterialItem & {
	id: string;
};
