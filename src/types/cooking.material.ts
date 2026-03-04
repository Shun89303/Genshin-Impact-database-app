export type Api = Record<string, ApiObject>;

export type ApiObject = {
	name: string;
	description?: string;
	rarity?: number;
	sources?: string[];
};

export type Normalized = ApiObject & {
	id: string;
};
