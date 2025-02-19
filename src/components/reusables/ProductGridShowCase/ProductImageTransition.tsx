import { useCallback, useState } from "react";
interface ProductImageTransitionProps {
  name: string;
  img_albums: { image_url: string }[];
}

export default function ProductImageTransition({
  name,
  img_albums,
}: ProductImageTransitionProps) {
  const [showFirstImage, setShowFirstImage] = useState(true);
  // Memoize event handlers to avoid unnecessary re-renders
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      (e.target as HTMLImageElement).src =
        "https://dummyjson.com/image/200x200";
    },
    []
  );

  return (
    <div
      onMouseEnter={() => setShowFirstImage(false)}
      onMouseLeave={() => setShowFirstImage(true)}
      className="relative bg-gray-300 w-full h-full overflow-hidden  shadow-lg"
    >
      <img
        src={img_albums[0]?.image_url}
        onError={handleImageError}
        alt={name}
        width={300}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
          showFirstImage ? "opacity-100" : "opacity-0"
        }`}
      />

      <img
        src={img_albums[1]?.image_url}
        onError={handleImageError}
        alt={name}
        width={300}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
          showFirstImage ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
