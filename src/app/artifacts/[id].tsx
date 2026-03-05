import ArtifactDetails from "@/src/components/screens/artifacts/details/artifactDetails";
import ScreenLoader from "@/src/components/ui/ScreenLoader";
import { useArtifacts } from "@/src/hooks/useArtifacts";
import { useLocalSearchParams } from "expo-router";

export default function ArtifactsDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();

	const { details, isLoading } = useArtifacts();

	const artifact = details.find((art) => art.id === id);

	if (isLoading || !artifact) return <ScreenLoader />;

	return <ArtifactDetails artifact={artifact} />;
}
