import React, { useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { AppDispatch, Category } from "../../../../../../../types";
import { setFilterCategories } from "../../../../../../../redux/reducers/FilterProductSlice";

interface MultiLevelCheckboxProps {
  data: Category[];
  handleChange: (checkedItems: string[]) => void;
}

const MultiLevelCheckbox: React.FC<MultiLevelCheckboxProps> = ({
  data,
  handleChange,
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  // Find parent categories (items with children)
  const parentCategories = data.filter(
    (item) => item.children && item.children.length > 0
  );

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCheckboxChange = (slug: string) => {
    setCheckedItems((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug);
      }
      return [...prev, slug];
    });
    handleChange(checkedItems);
  };

  const findProductCount = (slug: string) => {
    const item = data.find((item) => item.slug === slug);
    return item ? item.product_count : 0;
  };

  const renderCheckbox = (
    label: string,
    slug: string,
    isChecked: boolean,
    onChange: () => void,
    productCount = 0
  ) => (
    <label
      key={slug}
      className="flex items-center space-x-2 cursor-pointer group"
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="w-4 h-4 border-2 border-gray-300 rounded appearance-none checked:bg-blue-500 checked:border-transparent focus:outline-none transition-colors duration-200 ease-in-out hover:border-blue-400"
        />
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
        {label}
      </span>
      {productCount > 0 && (
        <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          ({productCount})
        </span>
      )}
    </label>
  );

  return (
    <div className="px-3">
      {checkedItems.length > 0 && (
        <div className="flex items-center">
          <h1 className="font-medium mr-1">Selected:</h1>
          <span className="text-gray-600 text-xs flex rounded-md mr-1">
            {checkedItems.join(", ")}
          </span>

          <button
            className="flex bg-red-500 hover:bg-red-400 rounded-md px-1 py-1 text-white items-center my-2"
            onClick={() => {
              setCheckedItems([]);
              dispatch(setFilterCategories([]));
            }}
          >
            <IoCloseOutline fontSize={15} />
            <span className="ml-1 text-xs"> Clear</span>
          </button>
        </div>
      )}
      {parentCategories.map((category) => (
        <div
          key={category._id}
          className="rounded-md transition-colors duration-200"
        >
          <div className="flex items-center justify-between p-2">
            {renderCheckbox(
              category.name,
              category.slug,
              checkedItems.includes(category.slug),
              () => handleCheckboxChange(category.slug),
              category.product_count
            )}
            <button
              onClick={() => toggleExpand(category._id)}
              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full focus:outline-none transition-colors duration-200"
            >
              {expandedItems[category._id] ? "-" : "+"}
            </button>
          </div>

          {expandedItems[category._id] && (
            <div className="ml-6 mt-2 space-y-3 p-2">
              {category.children.map((child) => (
                <div
                  key={child._id}
                  className="hover:bg-gray-100 rounded-md p-1 -ml-1"
                >
                  {renderCheckbox(
                    child.name,
                    child.slug,
                    checkedItems.includes(child.slug),
                    () => handleCheckboxChange(child.slug),
                    findProductCount(child.slug)
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiLevelCheckbox;
