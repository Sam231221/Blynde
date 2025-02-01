import clsx from "clsx";
import { FaRegCircleCheck } from "react-icons/fa6";
import { CiCircleAlert } from "react-icons/ci";
export const Message = ({
  variant,
  children,
}: {
  variant: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="container mx-auto ">
      <div
        className={clsx(
          "flex gap-2 items-center border px-4 py-3 rounded relative",
          variant === "alert" && "bg-red-100 border-red-400 text-red-700",
          variant === "success" &&
            "bg-green-100 border-green-400 text-green-700"
        )}
        role="alert"
      >
        {variant === "success" && <FaRegCircleCheck size={25} />}
        {variant === "alert" && <CiCircleAlert size={25} />}
        <strong className="font-medium text-xs">{children} </strong>
      </div>
    </div>
  );
};
