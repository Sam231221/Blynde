import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  clearCompare,
  removeProduct,
} from "../redux/reducers/CompareProductsSlice";

import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES } from "../routes/Routes";
const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Compare", path: ROUTES.COMPARE },
];
export default function ComparePage() {
  const compareProducts = useAppSelector((state) => state.comparelist.products);
  const dispatch = useAppDispatch();

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProduct(productId));
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
  };

  return (
    <div className="container mx-auto py-2 mt-10">
      <BreadCrumbs items={items} />

      {compareProducts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6 my-4 text-center shadow-sm">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {compareProducts.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 relative">
                <button
                  onClick={() => handleRemoveProduct(product._id)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
                <img
                  src={product.thumbnail_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-lg font-bold text-blue-600 mb-4">
                  ${product.price}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleClearAll}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Comparison Table</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Feature</th>
                  {compareProducts.map((product) => (
                    <th key={product._id} className="border p-2">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">Price</td>
                  {compareProducts.map((product) => (
                    <td key={product._id} className="border p-2">
                      ${product.price}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
