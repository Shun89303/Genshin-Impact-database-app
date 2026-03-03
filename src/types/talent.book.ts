export type Api = Record<string, ApiObject>;

export type ApiObject = {
	characters?: string[];
	availability?: string[];
	source?: string;
	items?: ApiItem[];
};

export type ApiItem = {
	id: string;
	name: string;
	rarity: number;
};

export type Normalized = ApiObject & {
	id: string;
};
