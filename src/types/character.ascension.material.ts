export type Api = Record<string, ApiObject>;

export type ApiObject = Record<string, ApiItem>;

export type ApiItem = {
	id: string;
	name: string;
	sources?: string[];
	rarity?: number;
};

export type Normalized = ApiItem & {
	element: string;
	title: string;
};
