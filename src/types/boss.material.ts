export type Api = Record<string, ApiObject>;

export type ApiObject = {
	name: string;
	source: string;
	characters?: string[];
};

export type Normalized = ApiObject & {
	id: string;
};
