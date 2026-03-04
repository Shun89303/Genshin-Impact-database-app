export type Api = Record<string, ApiObject>;

export type ApiObject = {
	characters?: string[];
	weapons?: string[];
	items: ApiItem[];
	sources: string[];
};

export type ApiItem = {
	id: string;
	name: string;
	rarity: number;
};

export type Normalized = ApiObject & {
	material: string;
};
