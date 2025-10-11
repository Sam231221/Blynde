import MultiLevelCheckbox from "./MultiLevelCheckBox";

import { setFilterCategories } from "../../../../../../redux/reducers/FilterProductSlice";

import SideFiltersLoader from "../../../../../../components/Fallbacks/Loadings/SideFiltersLoader";
import { useProductCategories } from "../../../../../../hooks/useProducts";
import { useAppDispatch } from "../../../../../../types/redux";

function FilterByCategory() {
  const dispatch = useAppDispatch();

  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useProductCategories();
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
        <div className="text-sm text-red-600 flex items-center space-x-2">
          <span>Error loading categories. Please try again later.</span>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      )}
      {!isLoading && !isError && categories && (
        <MultiLevelCheckbox
          handleChange={handleCategoriesChange}
          data={categories}
        />
      )}
    </div>
  );
}

export default FilterByCategory;
