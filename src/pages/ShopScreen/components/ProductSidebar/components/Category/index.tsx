import axios from "../../../../../../lib/api";
import { useEffect, useState } from "react";
import MultiLevelCheckbox from "./MultiLevelCheckBox";
import { AppDispatch } from "../../../../../../types";
import { useDispatch } from "react-redux";
import { setFilterCategories } from "../../../../../../redux/reducers/FilterProductSlice";

function Category() {
  const [categories, setCategories] = useState([]);
  const dispatch: AppDispatch = useDispatch();
  const loadCategories = async () => {
    const { data } = await axios.get("/api/products/categories/");
    setCategories(data);
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
        handleCategoriesChange={handleCategoriesChange}
        categories={categories}
      />
    </div>
  );
}

export default Category;
