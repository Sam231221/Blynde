import React from "react";
import { Link } from "react-router-dom";

interface BreadCrumbItem {
  path: string;
  label: string;
}

interface BreadCrumbsProps {
  items: BreadCrumbItem[];
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ items }) => {
  return (
    <nav className="text-xs my-3 mt-10" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={index}>
            <Link to={item.path} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </Link>
            {index < items.length - 1 && (
              <span className="text-gray-300">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
