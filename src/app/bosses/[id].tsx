import ScreenLoader from "@/src/components/common/ScreenLoader";
import BossDetails from "@/src/components/screens/bosses/details/bossDetails";
import { useBosses } from "@/src/hooks/useBosses";
import { useLocalSearchParams } from "expo-router";

export default function BossDetailsScreen() {
	const { id }: { id: any } = useLocalSearchParams();
	const { details, isLoading, isRefreshing, refetch } = useBosses();

	const boss = details.find((boss) => boss.id === id);

	if (isLoading || !boss) return <ScreenLoader />;

	return (
		<BossDetails boss={boss} refreshing={isRefreshing} onRefresh={refetch} />
	);
}
