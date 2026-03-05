import { endpoints } from "@/src/api/endpoints";
import { BASE_URL } from "@/src/config/env";
import { Artifact } from "@/src/types/artifact";
import React from "react";
import { StyleSheet, View } from "react-native";
import ArtifactDetailsInfo from "./artifactDetailsInfo";
import ArtifactImageFallback from "./artifactImageFallback";

export default function ArtifactDetails({ artifact }: { artifact: Artifact }) {
	const { artifacts } = endpoints;

	const pieces = [
		"flower-of-life",
		"plume-of-death",
		"sands-of-eon",
		"goblet-of-eonothem",
		"circlet-of-logos",
	];

	const imageUrls = pieces.map(
		(piece) => `${BASE_URL}${artifacts}/${artifact.id}/${piece}`
	);

	return (
		<View style={styles.container}>
			<View style={styles.imagesWrapper}>
				{/* Row 1 */}
				<View style={styles.row}>
					{imageUrls.slice(0, 3).map((uri) => (
						<ArtifactImageFallback key={uri} uri={uri} style={styles.image} />
					))}
				</View>

				{/* Row 2 */}
				<View style={styles.row}>
					{imageUrls.slice(3).map((uri) => (
						<ArtifactImageFallback key={uri} uri={uri} style={styles.image} />
					))}
				</View>
			</View>

			{/* Details */}
			<ArtifactDetailsInfo artifact={artifact} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0F172A",
		padding: 16,
	},

	imagesWrapper: {
		alignItems: "center",
		marginBottom: 16,
	},

	row: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 12,
		marginBottom: 12,
	},

	image: {
		width: 100,
		height: 100,
	},
});
