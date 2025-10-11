import { useModalContext } from "../providers/ModalProvider";
import { IoCloseOutline } from "react-icons/io5";
export const Modal = () => {
  const { isModalOpen, closeModal, content } = useModalContext();
  if (!isModalOpen) return null;

  return (
    <div className="fixed h-screen z-[998] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative z-[998] h-[80%]  bg-white p-6 rounded shadow-lg">
        <div
          onClick={closeModal}
          className="absolute border bg-white cursor-pointer rounded-full p-2 -top-2 -right-2"
        >
          <IoCloseOutline className="pointer-events-none" size={20} />
        </div>
        <div className="max-w-[750px] overflow-y-auto h-full  mx-auto">
          {content}
        </div>
      </div>
    </div>
  );
};
