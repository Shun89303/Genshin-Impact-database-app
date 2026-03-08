import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { ApiIds, ApiObject } from "../types/element";

const elements = endpoints.elements;

// will return an ARRAY of over 80 Element id strings
export function getElementsIds(): Promise<ApiIds> {
	return apiClient(elements);
}

// will return a huge OBJECT containing all the details of a Element
export function getElementDetails(id: string): Promise<ApiObject> {
	return apiClient(`${elements}/${id}`);
}
