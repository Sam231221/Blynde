import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { getUserDetails, updateUser } from "../../redux/actions/userActions";
import { USER_UPDATE_RESET } from "../../redux/reducers/User/UserUpdateSlice";
import PageContainer from "../../components/PageContainer";

function UserEditScreen() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const redirect = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      redirect("/admin/userlist");
    } else {
      if (!user.name || user._id !== Number(id)) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, id, redirect, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
    alert("User Sucessfully updated!");
    redirect(-1);
  };

  return (
    <PageContainer>
      <div className="container">
        <Link className="btn btn-sm btn-primary" to="/admin/userlist">
          Go Back
        </Link>

        <FormContainer>
          <div className="form-signin shadow w-100 m-auto">
            <h1>Edit User</h1>
            {/* {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div onSubmit={submitHandler}>
                <div className="mb-2">
                  <div>Name</div>
                  <input
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>

                <div className="mb-2">
                  <div>Email Address</div>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>

                <div className="mb-3">
                  <input
                    type="checkbox"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></input>
                </div>

                <button type="submit">Update</button>
              </div>
            )}
          </div>
        </FormContainer>
      </div>
    </PageContainer>
  );
}

export default UserEditScreen;
