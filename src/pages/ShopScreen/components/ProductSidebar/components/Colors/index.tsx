import ColorCheckBox from "./ColorCheckBox";
import { setColor } from "../../../../../../redux/reducers/FilterProductSlice";
import { useProductColors } from "../../../../../../hooks/useProducts";
import SideFiltersLoader from "../../../../../../components/Fallbacks/Loadings/SideFiltersLoader";
import { useAppDispatch } from "../../../../../../types/redux";

export default function Colors() {
  const dispatch = useAppDispatch();
  const { data: colors, isLoading, isError, refetch } = useProductColors();
  const handleColorChange = (color: string) => {
    dispatch(setColor(color));
  };
  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Colors
      </h2>
      {isLoading && <SideFiltersLoader itemCount={8} />}
      {isError && (
        <div className="text-sm text-red-600 flex items-center space-x-2">
          <span>Error loading Colors. Please try again later.</span>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      )}
      {!isLoading && !isError && (
        <div className="px-3">
          <ColorCheckBox
            handleColorChange={handleColorChange}
            direction="vertical"
            colors={colors || []}
          />
        </div>
      )}
    </div>
  );
}
