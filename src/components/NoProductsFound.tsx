import { ShoppingBag, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

export default function NoProductsFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12 px-4 sm:px-6 lg:px-8 min-h-[400px] rounded-lg border border-dashed border-gray-300 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/50">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
          <ShoppingBag className="h-10 w-10 text-gray-500 dark:text-gray-400" />
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          No products found
        </h3>

        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
          We couldn't find any products matching your criteria. Try adjusting
          your filters or check back later for new arrivals.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="#"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
          >
            Browse all products
          </Link>

          <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
