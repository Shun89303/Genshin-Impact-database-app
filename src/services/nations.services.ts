import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";

const nations = endpoints.nations;
const list = endpoints.list;

// will return an ARRAY of over 80 Nation id strings
export function getNationsIds() {
	return apiClient(nations);
}

// will return a huge OBJECT containing all the details of a Nation
export function getNationDetails(id: string) {
	return apiClient(`${nations}/${id}`);
}

// will return a small ARRAY containing the types of images the api offers for the selected Nation
export function getNationImageTypes(id: string) {
	return apiClient(`${nations}/${id}${list}`);
}
