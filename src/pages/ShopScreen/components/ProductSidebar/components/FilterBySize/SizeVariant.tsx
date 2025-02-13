// import { useCallback, useState } from "react";
// import Checkbox from "../../../../../../components/reusables/Checkbox";
// import { Size } from "../../../../../../types";

// interface FilterBySizeProps {
//   sizes: Size[];
//   handleChange: (selectedSizes: string[]) => void;
// }

// const SizeVariant: React.FC<FilterBySizeProps> = ({ sizes, handleChange }) => {
//   const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
//   const handleSizeChange = useCallback(
//     (size: Size) => {
//       const newSelected = selectedSizes.includes(size)
//         ? selectedSizes.filter((s) => s !== size)
//         : [...selectedSizes, size];
//       setSelectedSizes(newSelected);
//     },
//     [selectedSizes]
//   );

//   //   const handleSizeChange = useCallback(
//   //     (size: Size) => {
//   //       setSelectedSizes((prevSelectedSizes) => {
//   //         const newSelectedSizes = prevSelectedSizes.some((s) => s.id === size.id)
//   //           ? prevSelectedSizes.filter((s) => s.id !== size.id)
//   //           : [...prevSelectedSizes, size];

//   //         handleChange(newSelectedSizes.map((s) => s.name));
//   //         return newSelectedSizes;
//   //       });
//   //     },
//   //     [handleChange]
//   //   );

//   return (
//     <div className="w-full mb-4">
//       <h2 className="text-lg tracking-wide font-medium text-gray-900">
//         Filter By Size
//       </h2>
//       <div className="px-3">
//         {sizes.map((size) => (
//           <div key={size.id} className="flex items-center justify-between">
//             <Checkbox
//               id={size.id}
//               value={size.name}
//               label={size.name}
//               checked={selectedSizes.some((s) => s.id === size.id)}
//               onChange={() => handleSizeChange(size)}
//             />
//             <span className="text-gray-400">({size.product_count})</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SizeVariant;
