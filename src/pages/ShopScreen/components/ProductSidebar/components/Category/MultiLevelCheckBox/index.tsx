import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import Checkbox from "../../../../../../../components/reusables/Checkbox";

const MultiLevelCheckbox = ({ handleCategoriesChange, categories }) => {
  const [expanded, setExpanded] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleToggle = (id) => {
    const newExpanded = expanded.includes(id)
      ? expanded.filter((cat) => cat !== id)
      : [...expanded, id];
    setExpanded(newExpanded);
  };
  const handleChange = (category) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelected);
    handleCategoriesChange(newSelected);
  };

  const renderCategory = (category) => (
    <div key={category.id}>
      <div className="flex justify-between items-center py-1  cursor-pointer">
        {/* input field */}
        <Checkbox
          label={category.name}
          checked={expanded.includes(category.id)}
          onChange={() => {
            handleToggle(category.id);
            handleChange(category.name);
          }}
        />

        {category.genres.length > 0 && (
          <button className="text-gray-600">
            {expanded === category.id ? (
              <HiOutlineMinusSmall onClick={() => handleToggle(category.id)} />
            ) : (
              <GoPlus onClick={() => handleToggle(category.id)} />
            )}
          </button>
        )}
      </div>
      {expanded === category.id && category.genres.length > 0 && (
        <div className="pl-6 bg-white">
          {category.genres.map((genre) => (
            <div key={genre.id} className="flex items-center ">
              <Checkbox
                label={genre.name}
                checked={expanded.includes(category.id)}
                onChange={() => {
                  handleToggle(category.id);
                  handleChange(genre.name);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
  return (
    <div className="w-full px-3 max-w-md text-[14px] overflow-hidden">
      {categories
        .filter((category) => category.parent === null)
        .map((parentCategory) => (
          <React.Fragment key={parentCategory.id}>
            {renderCategory(parentCategory)}
            {categories
              .filter((category) => category.parent === parentCategory.id)
              .map((childCategory) => (
                <div key={childCategory.id} className="ml-4">
                  {renderCategory(childCategory)}
                </div>
              ))}
          </React.Fragment>
        ))}
    </div>
  );
};
export default MultiLevelCheckbox;
