import { apiRequest } from "../../../../../../lib/axiosClient";
import { useEffect, useState } from "react";
import MultiLevelCheckbox from "./MultiLevelCheckBox";
import { AppDispatch, Category } from "../../../../../../types";
import { useDispatch } from "react-redux";
import { setFilterCategories } from "../../../../../../redux/reducers/FilterProductSlice";

function FilterByCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const loadCategories = async () => {
    const data = await apiRequest({
      url: "/api/products/categories/",
      method: "GET",
      requiresToken: false,
    });
    setCategories(data as Category[]);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategoriesChange = (newSelectedCategory: string[]) => {
    dispatch(setFilterCategories(newSelectedCategory));
  };

  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Category
      </h2>
      <MultiLevelCheckbox
        handleChange={handleCategoriesChange}
        data={categories}
      />
    </div>
  );
}

export default FilterByCategory;
