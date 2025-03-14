import Rating from "../../../components/Rating";
import { removeProduct } from "../../../redux/reducers/CompareProductsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const CompareTable = () => {
  const { products } = useAppSelector((state) => state.comparelist);
  const dispatch = useAppDispatch();

  if (products.length === 0) return <p>No products selected for comparison.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-3 border">Action</th>
            {products.map((product) => (
              <th key={product._id} className="p-3 border">
                <button
                  className="bg-red-500 text-white px-2 py-1 text-sm"
                  onClick={() => dispatch(removeProduct(product._id))}
                >
                  Remove
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border">Name</td>
            {products.map((product) => (
              <td key={product._id} className="p-3 border text-center">
                {product.name}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 border">Price</td>
            {products.map((product) => (
              <td key={product._id} className="p-3 border text-center">
                <span className="text-red-500 font-bold">
                  ${product.discounted_price}
                </span>
                <br />
                <span className="line-through text-gray-400">
                  ${product.price}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 border">Rating</td>
            {products.map((product) => (
              <td key={product._id} className="p-3 border text-center">
                {product.rating ? (
                  <Rating value={product.rating} />
                ) : (
                  "No rating"
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Brand</td>
            {products.map((product) => (
              <td key={product._id} className="border p-2 text-center">
                {product.brand || "N/A"}
              </td>
            ))}
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Colors</td>
            {products.map((product) => (
              <td key={product._id} className="border p-2 text-center">
                <div className="flex justify-center gap-2">
                  {product.colors && product.colors.length > 0 ? (
                    product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="w-6 h-6 rounded-full border border-gray-300 inline-block"
                        style={{ backgroundColor: color.hex_code }}
                      ></span>
                    ))
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-2 font-semibold">Sizes</td>
            {products.map((product) => (
              <td key={product._id} className="border p-2 text-center">
                {product.sizes.length > 0 ? (
                  product.sizes.map((size) => (
                    <span
                      key={size._id}
                      className="px-2 py-1 border text-sm mx-1"
                    >
                      {size.name}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </td>
            ))}
          </tr>

          <tr>
            <td className="p-3 border">Stock</td>
            {products.map((product) => (
              <td key={product._id} className="p-3 border text-center">
                {product.countInStock > 0
                  ? `In Stock(${product.countInStock})`
                  : "Out of Stock"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
