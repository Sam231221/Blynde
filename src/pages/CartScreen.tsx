import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import ProductPriceInput from "../components/ProductPriceInput";
import {
  removeFromCart,
  selectCart,
  selectCartItemCount,
  selectCartTotal,
  updateQuantity,
} from "../redux/reducers/CartSlice";

import { useMemo, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useAppSelector } from "../redux/store";
import { ROUTES } from "../routes/Routes";
import { BreadCrumbs } from "../components/BreadCrumbs";
import clsx from "clsx";

const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Cart", path: ROUTES.CART },
];

interface CartItem {
  productId: string;
  name: string;
  thumbnailUrl: string;
  price: number;
  qty: number;
  color: string;
  size: string;
}

export default function CartScreen() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const totalCartItems = useAppSelector(selectCartItemCount);
  const totalCartAmount = useAppSelector(selectCartTotal);
  const cart = useAppSelector(selectCart);

  const data = useMemo(() => {
    return cart.flatMap((product) =>
      product.variations.map((variant) => ({
        productId: product.productId,
        name: product.name,
        thumbnailUrl: product.thumbnailUrl,
        price: product.price,
        qty: variant.qty,
        color: variant.color,
        size: variant.size,
      }))
    );
  }, [cart]);

  const handleDeleteVariant = (rowData: CartItem) => {
    dispatch(
      removeFromCart({
        productId: rowData.productId,
        color: rowData.color,
        size: rowData.size,
      })
    );
  };

  const columns = useMemo<ColumnDef<CartItem>[]>(
    () => [
      {
        accessorKey: "thumbnailUrl",
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue() as string}
            alt="Product"
            className="w-16 h-16 object-cover rounded"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => `$${info.getValue()}`,
      },
      {
        id: "quantity",
        header: "Quantity",
        cell: ({ row }) => (
          <ProductPriceInput
            qty={row.original.qty}
            id={`${row.original.productId}-${row.original.color}-${row.original.size}`}
            handleChange={(newQty) => {
              dispatch(
                updateQuantity({
                  productId: row.original.productId,
                  color: row.original.color,
                  size: row.original.size,
                  qty: newQty,
                })
              );
            }}
          />
        ),
      },
      {
        accessorKey: "color",
        header: "Color",
      },
      {
        accessorKey: "size",
        header: "Size",
      },
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <button
            onClick={() => handleDeleteVariant(row.original)}
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash size={18} />
          </button>
        ),
      },
    ],
    [dispatch]
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  const checkoutHandler = () => {
    redirect(ROUTES.ORDER_SHIPPING);
  };

  return (
    <div className="container mx-auto py-2 overflow-auto mt-10">
      <BreadCrumbs items={items} />

      <div className="flex flex-col md:flex-row gap-3 mt-10 mb-5">
        <div className="md:flex-1 flex-col">
          <div className="flex flex-col py-4 px-4 border border-gray-200">
            <p className="text-sm">
              Add <span className="font-medium text-sky-500">$300</span> to cart
              and get free shipping!
            </p>
            <div className="relative mb-3">
              <div
                className="absolute top-[9px] z-[3] left-0 h-2 bg-blue-500 rounded-lg"
                style={{ width: `20%` }}
              ></div>
              <div
                className="absolute top-[9px] z-[2] left-0 h-2 bg-gray-200 rounded-lg"
                style={{ width: `100%` }}
              ></div>
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            <div className="flex-1 md:flex-[3_1_0%]  overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="p-2 text-left border-b whitespace-nowrap"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="border-b">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="p-2 whitespace-nowrap">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="text-center p-4 text-gray-500"
                      >
                        Your cart is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page{" "}
                <strong>
                  {pagination.pageIndex + 1} of {table.getPageCount()}
                </strong>
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 border  mb-2  px-5 py-3">
          <h1 className="text-xl py-2 border-b border-gray-200 uppercase">
            Cart Totals
          </h1>

          <div className="flex border-b py-2 border-gray-200 justify-between text-sm my-3">
            <span> Total Items:</span>
            <span>{totalCartItems} items</span>
          </div>
          <div className="flex border-b py-2 border-gray-200 justify-between text-sm my-3">
            <span> Subtotal:</span>
            <span>$ {totalCartAmount}</span>
          </div>

          <div>
            <button
              type="button"
              className={clsx(
                "w-full uppercase bg-zinc-800 hover:bg-sky-600 text-white font-medium text-xs px-5 py-4 my-6",
                cart.length === 0 &&
                  "opacity-50 hover:bg-none cursor-not-allowed"
              )}
              disabled={cart.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
