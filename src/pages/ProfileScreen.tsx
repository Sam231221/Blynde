import { useEffect, useState } from "react";
import { MapPin, Mail, Package, Heart } from "lucide-react";
import PageContainer from "../components/PageContainer";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "../lib/userApi";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("orders");
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const recentOrders = [
    {
      id: "1",
      product: "Wireless Earbuds",
      date: "2023-05-15",
      status: "Delivered",
    },
    { id: "2", product: "Smart Watch", date: "2023-05-10", status: "Shipped" },
    {
      id: "3",
      product: "Laptop Stand",
      date: "2023-05-05",
      status: "Processing",
    },
  ];

  const favoriteProducts = [
    { id: "1", name: "Ergonomic Chair", price: "$199.99" },
    { id: "2", name: "Mechanical Keyboard", price: "$129.99" },
    { id: "3", name: "Noise-Canceling Headphones", price: "$249.99" },
  ];
  const { isLoading, error, data } = useGetUserProfileQuery();
  const { mutate: updateUserProfile, isPending } = useUpdateProfileMutation();
  useEffect(() => {
    if (data) {
      setUser({ ...user, name: data.name, email: data.email });
    }
  }, [data]);
  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserProfile(user);
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
                data.profile_pic || "https://ui-avatars.com/api/?name=John+Doe"
              }
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{data.location}</span>
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

        {activeTab === "orders" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
            <p className="text-gray-600 mb-4">
              View your order history and track shipments.
            </p>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{order.product}</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
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
            </div>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Favorite Products</h2>
            <p className="text-gray-600 mb-4">
              Your saved items for quick access.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favoriteProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.price}</p>
                  </div>
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            <p className="text-gray-600 mb-4">
              Manage your account details and preferences.
            </p>
            <form className="space-y-4" onSubmit={handleProfileUpdate}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
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
