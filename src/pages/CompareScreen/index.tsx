import { useAppDispatch } from "../../redux/store";
import {
  clearCompare,
  useCompareProducts,
} from "../../redux/reducers/CompareProductsSlice";

import { BreadCrumbs } from "../../components/BreadCrumbs";
import { ROUTES } from "../../routes/Routes";
import CompareTable from "./components/CompareTable";
const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Compare", path: ROUTES.COMPARE },
];
export default function ComparePage() {
  const { products } = useCompareProducts();
  const dispatch = useAppDispatch();

  const handleClearAll = () => {
    dispatch(clearCompare());
  };

  return (
    <div className="container mx-auto py-2 mt-10">
      <BreadCrumbs items={items} />

      {products.length === 0 ? (
        <div className="bg-white h-[60vh] flex items-center justify-center border border-gray-200 rounded-lg p-6 my-4 text-center shadow-sm">
          <div className="flex flex-col items-center">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Products to Compare
            </h3>
            <p className="text-gray-600 max-w-sm">
              There are currently no products added to the comparison list.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={handleClearAll}
              className="bg-red-600 mb-2 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          <CompareTable />
        </>
      )}
    </div>
  );
}
