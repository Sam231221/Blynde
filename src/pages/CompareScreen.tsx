import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  clearCompare,
  removeProduct,
} from "../redux/reducers/CompareProductsSlice";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Comparison</h1>
        <Link
          to="/"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>

      {compareProducts.length === 0 ? (
        <p>No products to compare. Add some products to start comparing.</p>
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
