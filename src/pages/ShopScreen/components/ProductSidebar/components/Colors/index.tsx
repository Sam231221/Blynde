import { useEffect, useState } from "react";
import { apiRequest } from "../../../../../../lib/api";
import ColorCheckBox from "./ColorCheckBox";
import { useDispatch } from "react-redux";
import { AppDispatch, Color } from "../../../../../../types";
import { setColor } from "../../../../../../redux/reducers/FilterProductSlice";

export default function Colors() {
  const [colors, setColors] = useState<Color[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const loadColors = async () => {
    const data: Color[] = await apiRequest("/api/products/colors/", "GET");
    setColors(data);
  };
  useEffect(() => {
    loadColors();
  }, []);
  const handleColorChange = (color: string) => {
    dispatch(setColor(color));
  };
  return (
    <div className="w-full mb-4">
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Colors
      </h2>
      <div className="px-3">
        <ColorCheckBox
          handleColorChange={handleColorChange}
          direction="vertical"
          colors={colors}
        />
      </div>
    </div>
  );
}
