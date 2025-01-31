import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Message } from "../components/Message";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import PageContainer from "../components/PageContainer";
const items = [
  { label: "Home", path: "/" },
  { label: "UserProfile", path: "/profile" },
];
function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  console.log("adasd");
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userProfileUpdate);
  const { success } = userUpdateProfile;

  useEffect(() => {
    //if the user is not logged in
    if (!userInfo) {
      redirect("/login");
    } else {
      //get the details from backend
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch(getUserDetails());
      } else {
        //set the name and email to form field after getting user detail from /api/users/profile/.
        setName(user.name);
        setEmail(user.email);
      }
    }
    //only if user attribute of userDetails changes.
  }, [user, dispatch, redirect, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };
  return (
    <PageContainer>
      <div className="container mx-auto py-2 overflow-auto mt-10">
        {/* Breadcrumbs */}
        <nav className="text-xs mt-10" aria-label="Breadcrumb">
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
        <div className="shadow my-4 mx-auto md:w-1/3 border py-3 px-4">
          <h1 className="font-medium text-2xl border-b mb-2 pb-2">
            Profile Page
          </h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="mb-3 flex flex-col">
              <label className="text-sm mb-2 font-semibold  text-zinc-900">
                Name
              </label>
              <input
                required
                className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div className="mb-3 flex flex-col">
              <label className="text-sm mb-2 font-semibold  text-zinc-900">
                Email Address
              </label>
              <input
                className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div className="mb-3 flex flex-col">
              <label className="text-sm mb-2 font-semibold  text-zinc-900">
                Password
              </label>
              <input
                className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
                type="password"
                placeholder="Email address"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <div className="mb-3 flex flex-col">
              <label className="text-sm mb-2 font-semibold  text-zinc-900">
                Confirm Password
              </label>
              <input
                className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>

            <button
              type="submit"
              className="text-sm bg-sky-500 font-medium uppercase hover:bg-sky-600 text-white py-2 px-4"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

export default ProfileScreen;
