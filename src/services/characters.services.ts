import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const characters = endpoints.characters;
const list = endpoints.list;

// will return an ARRAY of over 80 Character id strings
export function getCharactersIds() {
	return apiClient(characters);
}

// will return a huge OBJECT containing all the details of a Character
export function getCharacterDetails(id: string) {
	return apiClient(`${characters}/${id}`);
}

// will return a small ARRAY containing the types of images the api offers for the selected Character
export function getCharacterImageTypes(id: string) {
	return apiClient(`${characters}/${id}${list}`);
}
