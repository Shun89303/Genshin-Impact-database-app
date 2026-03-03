export type Api = Record<string, ApiObject[]>;

export type ApiObject = {
	id: string;
	name: string;
	characters: string[];
};

export type Normalized = {
	nation: string;
	items: ApiObject[];
};
