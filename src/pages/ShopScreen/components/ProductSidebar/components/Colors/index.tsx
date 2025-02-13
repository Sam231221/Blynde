import { useEffect, useState } from "react";
import axios from "../../../../../../lib/api";
import ColorCheckBox from "./ColorCheckBox";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../types";
import { setColor } from "../../../../../../redux/reducers/FilterProductSlice";

export default function Colors() {
  const [colors, setColors] = useState([]);
  const dispatch: AppDispatch = useDispatch();

  const loadColors = async () => {
    const { data } = await axios.get("/api/products/colors/");
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
