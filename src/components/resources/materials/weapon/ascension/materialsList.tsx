import { endpoints } from "@/src/api/endpoints";
import styles from "@/src/components/styles.modules";
import FilterCatalog from "@/src/components/utils/wam/filterCatalog";
import SearchFilterBar from "@/src/components/utils/wam/searchFilterBar";
import { BASE_URL } from "@/src/config/env";
import { useWeaponAscensionMaterialsStore } from "@/src/store/useWeaponAscensionStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import FilterList from "./filterList";
import SearchList from "./searchList";

export default function MaterialsList() {
	const fetchAllDetails = useWeaponAscensionMaterialsStore(
		(state) => state.fetchAllDetails
	);
	const details = useWeaponAscensionMaterialsStore((state) => state.details);
	const input = useWeaponAscensionMaterialsStore((state) => state.input);
	const selectedType = useWeaponAscensionMaterialsStore(
		(state) => state.selectedType
	);
	const groupByType = useWeaponAscensionMaterialsStore(
		(state) => state.groupByType
	);
	const materialIds = useWeaponAscensionMaterialsStore(
		(state) => state.materialIds
	);
	const error = useWeaponAscensionMaterialsStore((state) => state.error);

	const materials = endpoints.materials;
	const weaponAscension = endpoints.weaponAscension;

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["40%"], []);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				await fetchAllDetails();
			} finally {
				setLoading(false);
			}
		};

		if (!details.length) {
			load();
		} else {
			// PREFETCH IMAGES
			materialIds.forEach((id) => {
				Image.prefetch(`${BASE_URL}${materials}${weaponAscension}/${id}`);
			});
			setLoading(false);
		}
	}, [fetchAllDetails, materials, details, materialIds, weaponAscension]);

	const finalData = useMemo(() => {
		let result = details;

		if (input.trim().length > 0) {
			const lower = input.toLowerCase();
			result = result.filter((wam) =>
				(wam.name ?? "").toLowerCase().includes(lower)
			);
		}

		if (selectedType) {
			return groupByType(result, selectedType);
		}

		return result;
	}, [details, groupByType, input, selectedType]);

	if (error) {
		return (
			<View style={styles.simpleContainer}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!selectedType) {
		return (
			<>
				{loading && (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" />
					</View>
				)}
				<SearchFilterBar sheetRef={sheetRef} />
				<SearchList finalData={finalData} />
				<BottomSheet
					ref={sheetRef}
					snapPoints={snapPoints}
					index={-1}
					enablePanDownToClose
				>
					<BottomSheetView>
						<FilterCatalog sheetRef={sheetRef} />
					</BottomSheetView>
				</BottomSheet>
			</>
		);
	}

	return (
		<>
			{loading && (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>
			)}
			<SearchFilterBar sheetRef={sheetRef} />
			<FilterList finalData={finalData} />
			<BottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				index={-1}
				enablePanDownToClose
			>
				<BottomSheetView>
					<FilterCatalog sheetRef={sheetRef} />
				</BottomSheetView>
			</BottomSheet>
		</>
	);
}
