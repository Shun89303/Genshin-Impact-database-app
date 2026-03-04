import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { ApiIds, Character } from "../types/character";

const characters = endpoints.characters;

// will return an ARRAY of over 80 Character id strings
export function getCharactersIds(): Promise<ApiIds> {
	return apiClient(characters);
}

// will return a huge OBJECT containing all the details of a Character
export function getCharacterDetails(id: string): Promise<Character> {
	return apiClient(`${characters}/${id}`);
}
