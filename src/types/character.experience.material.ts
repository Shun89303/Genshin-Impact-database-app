export type CharacterExperienceItem = {
	id: string;
	name: string;
	experience: number;
	rarity: number;
};

export type CharacterExperience = {
	id: string;
	items: CharacterExperienceItem[];
};
