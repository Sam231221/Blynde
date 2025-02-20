import type React from "react";
import { XCircle, RefreshCw } from "lucide-react";

interface NoProductsFoundProps {
  onClearFilters?: () => void;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="mb-6">
        <XCircle className="w-16 h-16 text-gray-400 animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        No Products Found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn't find any products matching your current filters. Try
        adjusting your selection or start over.
      </p>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Suggestions:</p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Check for any spelling errors in your search</li>
          <li>• Use more general terms in your search</li>
          <li>• Try a different combination of filters</li>
          <li>• Explore other categories</li>
        </ul>
      </div>
      <button
        onClick={onClearFilters}
        className="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold transition duration-300 ease-in-out transform hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Clear All Filters
      </button>
    </div>
  );
};

export default NoProductsFound;
