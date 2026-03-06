type Drop = {
	name: string;
	rarity: number;
	source: string;
};

type Artifact = {
	name: string;
	max_rarity: number;
};

export type Boss = {
	name: string;
	description: string;
	drops: Drop[];
	artifacts: Artifact[];
	id: string;
};

export type ApiIds = string[];
