import { useCallback, useEffect, useState } from "react";
import axios from "../../../../../../lib/api";
import Checkbox from "../../../../../../components/reusables/Checkbox";

interface Size {
  id: string;
  name: string;
  product_count: number;
}

interface FilterBySizeProps {
  handleSizeChange: (selectedSizes: string[]) => void;
}

const FilterBySize: React.FC<FilterBySizeProps> = ({ handleSizeChange }) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadSizes = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/products/sizes/");
      setSizes(data);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = useCallback(
    (size: string) => {
      setSelectedSizes((prevSelectedSizes) => {
        const newSelected = prevSelectedSizes.includes(size)
          ? prevSelectedSizes.filter((s) => s !== size)
          : [...prevSelectedSizes, size];
        handleSizeChange(newSelected);
        return newSelected;
      });
    },
    [handleSizeChange]
  );

  useEffect(() => {
    loadSizes();
  }, [loadSizes]);

  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Filter By Size
      </h2>
      <div className="px-3">
        {loading ? (
          <p>Loading sizes...</p>
        ) : (
          sizes.map((size) => (
            <div key={size.id} className="flex items-center justify-between">
              <Checkbox
                id={size.id}
                value={size.name}
                label={size.name}
                checked={selectedSizes.includes(size.name)}
                onChange={() => handleChange(size.name)}
              />
              <span className="text-gray-400">({size.product_count})</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilterBySize;
