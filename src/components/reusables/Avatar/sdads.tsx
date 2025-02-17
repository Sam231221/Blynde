"use client";

import type React from "react";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

interface AvatarProps {
  initialImage?: string;
  size?: number;
  handleChange?: (imageData: { file: Blob; url: string }) => void;
}

const Avatar: React.FC<AvatarProps> = ({
  initialImage = "/placeholder.svg",
  size = 100,
  handleChange,
}) => {
  const [image, setImage] = useState<string>(initialImage);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      const { file, url } = await getCroppedImg(image, croppedAreaPixels);
      setImage(url);
      if (handleChange) {
        handleChange({ file, url });
      }
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, image, handleChange]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
      if (handleChange) {
        handleChange({ file, url });
      }
      setIsModalOpen(true);
    }
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className="relative"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div
        className="rounded-full overflow-hidden cursor-pointer group"
        style={{ width: `${size}px`, height: `${size}px` }}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <img
          src={image || "/placeholder.svg"}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
          <span className="text-white text-sm font-semibold">Change Photo</span>
        </div>
      </div>
      <button
        className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors duration-200"
        onClick={openEditModal}
        style={{ transform: "translate(25%, 25%)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <div className="relative h-64 mb-4">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={showCroppedImage}
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;

// Helper function to crop the image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: any
): Promise<{ file: Blob; url: string }> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });
      const url = URL.createObjectURL(file);
      resolve({ file, url });
    }, "image/jpeg");
  });
};
