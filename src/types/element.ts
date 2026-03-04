export type ApiIds = string[];

export type ApiObject = {
	name: string;
	reactions: ApiItem[];
	id: string;
};

export type ApiItem = {
	name: string;
	elements: string[];
	description: string;
};

export type Normalized = ApiObject;
