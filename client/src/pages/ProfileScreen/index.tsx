import { useEffect, useState } from "react";
import { Mail, Package } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "../../lib/django/userApi";
import Avatar from "./components/Avatar";

import { BreadCrumbs } from "../../components/BreadCrumbs";
import { ROUTES } from "../../routes/Routes";
import { useRecentUserOrders } from "../../hooks/useOrders";
import { ServerDownError } from "../../components/Fallbacks/Errors/ServerDownError";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import Moment from "moment";
import { toast } from "react-toastify";

interface UserProfileData {
  first_name: string;
  last_name: string;
  email: string;
  profile_pic_url?: string;
}
const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Profile", path: "#" },
];
export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("orders");
  const { register, handleSubmit, setValue } = useForm<UserProfileData>();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { isLoading, error, data } = useGetUserProfileQuery();

  const { mutate: updateUserProfile, isPending } = useUpdateProfileMutation();

  const {
    data: recentOrders,
    isLoading: isUserOrdersLoading,
    isError,
    refetch,
  } = useRecentUserOrders(data?._id);
  useEffect(() => {
    if (data) {
      setValue("first_name", data.first_name);
      setValue("last_name", data.last_name);
    }
  }, [data, setValue]);

  const handleProfileUpdate = (data: UserProfileData) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    updateUserProfile(formData, {
      onSuccess: () => {
        toast.success("Profile Updated Successfully");
      },
      onError: (error) => {
        toast.error(error.errors.general);
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="container mx-auto mt-10 px-4 py-8">
      <BreadCrumbs items={items} />
      <div className="mt-3 flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img
            src={
              data?.profile_pic_url ||
              `https://ui-avatars.com/api/?name=${data?.first_name}+${data?.last_name}`
            }
            alt={data?.first_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{data?.first_name}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data?.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "orders"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Recent Orders
          </button>

          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "settings"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>
      </div>

      {activeTab === "settings" && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
          <p className="text-gray-600 mb-4">
            Manage your account details and preferences.
          </p>

          <div className="p-3 w-full flex flex-col items-center">
            <div className="w-[200px] mt-3 sm:w-[400px] md:w-[500px] lg:w-[700px]">
              {/* Avatar */}

              <Avatar
                initialImage={
                  data?.profile_pic_url ||
                  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                }
                size={100}
                handleChange={({ file }) => {
                  if (file) {
                    setAvatarFile(file);
                  }
                }}
              />
            </div>
          </div>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleProfileUpdate)}
          >
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                {...register("first_name", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                {...register("last_name", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isPending ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      )}
      {activeTab === "orders" && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
          <p className="text-gray-600 mb-4">
            View your order history and track shipments.
          </p>
          <div className="space-y-4">
            {isUserOrdersLoading && (
              <div className="flex items-center justify-center w-full h-[300px]">
                <Spinner />
              </div>
            )}
            {isError && <ServerDownError refetch={refetch} />}
            {!isUserOrdersLoading && !isError && recentOrders && (
              <>
                {recentOrders.length > 0 ? (
                  <>
                    {recentOrders.map((order) => (
                      <div
                        key={order._id}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <div>
                          <Link
                            to={`/orders/${order.order_number}`}
                            className="font-medium hover:text-sky-700"
                          >
                            {order.order_number}
                          </Link>
                          <p className="text-sm text-gray-600">
                            on{" "}
                            {Moment(order.createdAt).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          <Package className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>No Orders were made in recent times.</>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
