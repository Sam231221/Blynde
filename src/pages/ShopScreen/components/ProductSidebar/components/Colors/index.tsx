import ColorCheckBox from "./ColorCheckBox";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../types";
import { setColor } from "../../../../../../redux/reducers/FilterProductSlice";
import { useProductColors } from "../../../../../../hooks/useProducts";
import SideFiltersLoader from "../SideFiltersLoader";

export default function Colors() {
  const dispatch: AppDispatch = useDispatch();
  const { data: colors, isLoading, isError } = useProductColors();
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
        <span className="text-sm">
          Error loading Colors. Please try again later.
        </span>
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
