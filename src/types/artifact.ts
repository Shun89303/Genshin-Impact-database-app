export interface BaseArtifact {
	id: string;
	name: string;
	max_rarity: number;
}

export interface TwoFourPieceArtifact extends BaseArtifact {
	type: "two-four";
	"2-piece_bonus": string;
	"4-piece_bonus": string;
}

export interface OnePieceArtifact extends BaseArtifact {
	type: "one";
	"1-piece_bonus": string;
}

export type Artifact = TwoFourPieceArtifact | OnePieceArtifact;

export type ApiIds = string[];
