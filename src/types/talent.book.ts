export type Book = {
	id: string;
	name: string;
	rarity: number;
};

export type TalentBook = {
	id: string;
	availability: string[];
	items: Book[];
};
