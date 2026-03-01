export type CommonAscensionMaterialItem = {
	id: string;
	name: string;
	rarity: number;
};

export type CommonAscensionMaterialGroup = {
	characters?: string[];
	weapons?: string[];
	items: CommonAscensionMaterialItem[];
	sources?: string[];
};

export type RawCommonAscensionMaterialsApi = {
	id: string;
	[key: string]: CommonAscensionMaterialGroup | string;
};

export type NormalizedCommonAscensionMaterialGroup =
	CommonAscensionMaterialGroup & {
		id: string;
	};
