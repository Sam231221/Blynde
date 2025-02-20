import MultiLevelCheckbox from "./MultiLevelCheckBox";
import { AppDispatch } from "../../../../../../types";
import { useDispatch } from "react-redux";
import { setFilterCategories } from "../../../../../../redux/reducers/FilterProductSlice";

import SideFiltersLoader from "../SideFiltersLoader";
import { useProductCategories } from "../../../../../../hooks/useProducts";

function FilterByCategory() {
  const dispatch: AppDispatch = useDispatch();

  const { data: categories, isLoading, isError } = useProductCategories();
  const handleCategoriesChange = (newSelectedCategory: string[]) => {
    dispatch(setFilterCategories(newSelectedCategory));
  };

  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Category
      </h2>
      {isLoading && <SideFiltersLoader />}
      {isError && <div>Error loading categories. Please try again later.</div>}
      {!isLoading && !isError && (
        <MultiLevelCheckbox
          handleChange={handleCategoriesChange}
          data={categories || []} // Fallback to an empty array if categories is undefined
        />
      )}
    </div>
  );
}

export default FilterByCategory;
