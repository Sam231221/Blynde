import { useEffect, useState } from "react";
import { Mail, Package, Heart } from "lucide-react";
import { useForm } from "react-hook-form";
import PageContainer from "../components/PageContainer";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "../lib/userApi";
import Avatar from "../components/reusables/Avatar";

interface ProfileData {
  first_name: string;
  last_name: string;
  avatar?: File;
}
export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("orders");
  const { register, handleSubmit, setValue, watch } = useForm<ProfileData>();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { isLoading, error, data } = useGetUserProfileQuery();
  const { mutate: updateUserProfile, isPending } = useUpdateProfileMutation();
  // Pre-fill form when profile data is fetched
  useEffect(() => {
    if (data) {
      setValue("first_name", data.first_name);
      setValue("last_name", data.last_name);
      // If you want to handle avatar image preview, do it here as well
    }
  }, [data, setValue]);

  const handleProfileUpdate = (data: ProfileData) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    console.log(avatarFile);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    updateUserProfile(formData);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <PageContainer>
      <div className="container mx-auto mt-14 px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
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
                activeTab === "favorites"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favorites
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
                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  }
                  size={100}
                  handleChange={({ file }) => {
                    console.log(file);
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
      </div>
    </PageContainer>
  );
}
