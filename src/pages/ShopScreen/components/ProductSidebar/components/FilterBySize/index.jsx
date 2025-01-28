import { useCallback, useEffect, useState } from "react";
import axios from "../../../../../../lib/api";
import Checkbox from "../../../../../../components/reusables/Checkbox";

export default function FilterBySize({ handleSizeChange }) {
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    (size) => {
      const newSelected = selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size];
      setSelectedSizes(newSelected);
      handleSizeChange(newSelected);
    },
    [selectedSizes, handleSizeChange]
  );

  useEffect(() => {
    loadSizes();
  }, []);

  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Filter By Size
      </h2>
      <div className="px-3">
        {sizes.map((size) => {
          return (
            <div key={size.id} className="flex items-center justify-between">
              <Checkbox
                key={size.id}
                label={size.name}
                checked={selectedSizes.includes(size.name)}
                onChange={() => handleChange(size.name)}
              />
              <span className="text-gray-400">({size.product_count})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
