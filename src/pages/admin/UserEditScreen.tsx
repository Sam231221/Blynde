import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import PageContainer from "../../components/PageContainer";
import { useUpdateUserMutation, useUserDetailQuery } from "../../lib/userApi";
const items = [
  { label: "Admin", path: "/" },
  { label: "UserDetail", path: "/UserDetail" },
];
function UserEditScreen() {
  const { id } = useParams<{ id: string | undefined }>();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    profile_pic: "", // For file uploads
  });

  const dispatch = useDispatch();
  const redirect = useNavigate();
  const {
    data: fetchedUser,
    isLoading,
    error,
  } = useUserDetailQuery(Number(id));
  const updateMutation = useUpdateUserMutation();
  useEffect(() => {
    if (fetchedUser) {
      setFormData({
        ...fetchedUser,
        first_name: fetchedUser.first_name,
        last_name: fetchedUser.last_name,
        username: fetchedUser.username,
        email: fetchedUser.email,
        profile_pic: fetchedUser.profile_pic || "",
      }); // Initialize local state with fetched data
    } else {
      // This is CRUCIAL: Set default values if fetchedUser is null/undefined
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        profile_pic: "",
      });
    }
  }, [fetchedUser]);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate(formData);
  };
  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <PageContainer>
      <div className="min-h-screen bg-gray-100">
        <nav className="ml-5  text-xs mt-20" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {items.map((item, index) => (
              <li className="flex items-center gap-2" key={index}>
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className="text-gray-300">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-7xl mx-auto mt-14 py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Header */}

            {/* Main content */}
            <div className="flex flex-col lg:flex-row">
              {/* Left column - User details */}
              <div className="w-full lg:w-2/3 p-6">
                <h2 className="text-2xl font-semibold mb-6">Edit User</h2>
                <form onSubmit={handleSubmit} className="container mx-auto p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {" "}
                    {/* Responsive grid */}
                    <div className="mb-4">
                      <label
                        htmlFor="first_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={(e) => handleChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="last_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={(e) => handleChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Username
                      </label>
                      <input
                        type="username"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={(e) => handleChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="profile_pic"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Profile Picture
                      </label>
                      <input
                        type="text"
                        id="profile_pic"
                        name="profile_pic"
                        value={formData.profile_pic}
                        onChange={(e) => handleChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {updateMutation.isPending ? "Updating..." : "Update User"}
                  </button>
                  {updateMutation.isError && (
                    <p className="text-red-500 mt-2">
                      Error: {updateMutation.error.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default UserEditScreen;
