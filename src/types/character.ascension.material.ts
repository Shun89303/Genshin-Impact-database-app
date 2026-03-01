export type MaterialTier = {
	element: string;
	id: string;
	name: string;
};

export type ElementTiers = {
	sliver: MaterialTier;
	fragment: MaterialTier;
	chunk: MaterialTier;
	gemstone: MaterialTier;
};

export type CharacterAscensionApi = {
	[element: string]: ElementTiers;
};
