import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const elements = endpoints.elements;
const list = endpoints.list;

// will return an ARRAY of over 80 Element id strings
export async function getElementsIds() {
	return await apiClient(elements);
}

// will return a huge OBJECT containing all the details of a Element
export async function getElementDetails(id: string) {
	return await apiClient(`${elements}/${id}`);
}

// will return a small ARRAY containing the types of images the api offers for the selected Element
export async function getElementImageTypes(id: string) {
	return await apiClient(`${elements}/${id}${list}`);
}
