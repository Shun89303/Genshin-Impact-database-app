import { useScreenDetails } from "@/src/hooks/useScreenDetails";
import {
	CharactersState,
	useCharactersStore,
} from "@/src/store/useCharactersStore";
import { Character } from "@/src/types/character";

export function useCharacters() {
	return useScreenDetails<
		Character,
		CharactersState["groupByType"],
		CharactersState["selectedType"]
	>(useCharactersStore);
}
