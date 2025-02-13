import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import Checkbox from "../../../../../../../components/reusables/Checkbox";

interface Category {
  id: string;
  name: string;
  parent: string | null;
  genres: Category[];
}

interface MultiLevelCheckboxProps {
  handleCategoriesChange?: (selectedCategories: string[]) => void;
  categories: Category[];
}

const MultiLevelCheckbox: React.FC<MultiLevelCheckboxProps> = ({
  categories,
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    const newExpanded = expanded.includes(id)
      ? expanded.filter((cat) => cat !== id)
      : [...expanded, id];
    setExpanded(newExpanded);
  };

  const handleChange = (category: string) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelected);
    // handleCategoriesChange(newSelected);
  };

  const renderCategory = (category: Category) => (
    <div key={category.id}>
      <div className="flex justify-between items-center py-1 cursor-pointer">
        <Checkbox
          id={category.id}
          value={category.name}
          label={category.name}
          checked={selectedCategories.includes(category.name)}
          onChange={() => handleChange(category.name)}
        />
        {category.genres.length > 0 && (
          <button className="text-gray-600">
            {expanded.includes(category.id) ? (
              <HiOutlineMinusSmall onClick={() => handleToggle(category.id)} />
            ) : (
              <GoPlus onClick={() => handleToggle(category.id)} />
            )}
          </button>
        )}
      </div>
      {expanded.includes(category.id) && category.genres.length > 0 && (
        <div className="pl-6 bg-white">
          {category.genres.map((genre, key) => (
            <div key={key} className="flex items-center">
              <Checkbox
                id={genre.id}
                value={genre.name}
                label={genre.name}
                checked={selectedCategories.includes(genre.name)}
                onChange={() => handleChange(genre.name)}
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
        .map((parentCategory, key) => (
          <React.Fragment key={key}>
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
