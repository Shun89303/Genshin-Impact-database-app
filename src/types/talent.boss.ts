export type Api = Record<string, ApiObject>;

export type ApiObject = {
	id: string;
	name: string;
	characters?: string[];
};
