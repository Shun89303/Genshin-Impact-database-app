import apiClient from "../api/client";
import { endpoints } from "../api/endpoints";
import { ApiIds, ApiObject } from "../types/nation";

const nations = endpoints.nations;

// will return an ARRAY of over 80 Nation id strings
export function getNationsIds(): Promise<ApiIds> {
	return apiClient(nations);
}

// will return a huge OBJECT containing all the details of a Nation
export function getNationDetails(id: string): Promise<ApiObject> {
	return apiClient(`${nations}/${id}`);
}
