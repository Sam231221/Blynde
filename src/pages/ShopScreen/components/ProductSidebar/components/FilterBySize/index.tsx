import { useCallback, useEffect, useState } from "react";
import axios from "../../../../../../lib/api";
import Checkbox from "../../../../../../components/reusables/Checkbox";
import { AppDispatch, Size } from "../../../../../../types";
import { useDispatch } from "react-redux";
import { setFilterSizes } from "../../../../../../redux/reducers/FilterProductSlice";

export default function FilterBySize() {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const loadSizes = async () => {
    try {
      const { data } = await axios.get("/api/products/sizes/");
      setSizes(data);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    loadSizes();
  }, []);
  if (loading) {
    return <div>Loading Sizes...</div>;
  }
  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Filter By Size
      </h2>
      <div className="px-3">
        {sizes.length > 0 &&
          sizes.map((size, key) => {
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
    </div>
  );
}
