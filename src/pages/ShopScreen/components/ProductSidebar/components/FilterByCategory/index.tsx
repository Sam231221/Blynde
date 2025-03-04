import MultiLevelCheckbox from "./MultiLevelCheckBox";

import { setFilterCategories } from "../../../../../../redux/reducers/FilterProductSlice";

import SideFiltersLoader from "../SideFiltersLoader";
import { useProductCategories } from "../../../../../../hooks/useProducts";
import { useAppDispatch } from "../../../../../../redux/store";

function FilterByCategory() {
  const dispatch = useAppDispatch();

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
      {isError && (
        <span className="text-sm">
          Error loading categories. Please try again later.
        </span>
      )}
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
