import { useCallback, useState } from "react";

import Checkbox from "../../../../../../components/reusables/Checkbox";

import { setFilterSizes } from "../../../../../../redux/reducers/FilterProductSlice";
import { IoCloseOutline } from "react-icons/io5";
import { useProductSizes } from "../../../../../../hooks/useProducts";
import SideFiltersLoader from "../SideFiltersLoader";
import { useAppDispatch } from "../../../../../../redux/store";
import { Size } from "../../../../../../types";

export default function FilterBySize() {
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);

  const dispatch = useAppDispatch();
  const { data: sizes, isLoading, isError } = useProductSizes();
  const handleChange = useCallback(
    (size: Size) => {
      const newSelected = selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size];
      setSelectedSizes(newSelected);
      dispatch(setFilterSizes(newSelected.map((size) => size.name)));
    },
    [selectedSizes, dispatch]
  );

  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Filter By Size
      </h2>
      {isLoading && <SideFiltersLoader itemCount={5} />}
      {isError && (
        <span className="text-sm">
          Error loading Sizes. Please try again later.
        </span>
      )}
      {!isLoading && !isError && (
        <div className="px-3">
          {selectedSizes.length > 0 && (
            <div className="flex items-center">
              <h1 className="font-medium mr-1">Selected:</h1>
              {selectedSizes.map((size, key) => (
                <span key={key} className="text-gray-600 rounded-md mr-1">
                  {size.name},
                </span>
              ))}
              <button
                className="flex bg-red-500 hover:bg-red-400 rounded-md px-2 py-1 text-white items-center my-2"
                onClick={() => {
                  setSelectedSizes([]);
                  dispatch(setFilterSizes([]));
                }}
              >
                <IoCloseOutline fontSize={15} />
                <span className="ml-2 text-xs"> Clear</span>
              </button>
            </div>
          )}
          {(sizes ?? []).length > 0 &&
            (sizes ?? []).map((size, key) => {
              return (
                <div key={key} className="flex items-center justify-between">
                  <Checkbox
                    id={size._id}
                    value={size.name}
                    key={size._id}
                    label={size.name}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleChange(size)}
                  />
                  <span className="text-gray-400">({size.product_count})</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
