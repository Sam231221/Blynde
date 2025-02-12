//In useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/reducers/AuthSlice";
import { RootState } from "../types";
import { loginUser, registerUser, resetPasswordForUser } from "../lib/authApi";
// Login Hook
export const useLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      dispatch(setUser(user));
      queryClient.setQueryData(["user"], user);
    },
  });
};

export const usePasswordReset = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetPasswordForUser,
  });
};
// Register Hook
export const useRegister = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    //this need for internal management
    // managing your application state (Redux, query cache)
    onSuccess: (user) => {
      dispatch(setUser(user));
      queryClient.setQueryData(["user"], user);
    },
    // we'll handle errors on component level
    // onError: (error) => {
    //   console.error("Registration failed:", error);
    // },
  });
};
export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return () => {
    dispatch(logout());
    queryClient.removeQueries({ queryKey: ["user"] });
  };
};

export const useUser = () => {
  return useSelector((state: RootState) => state.auth.userInfo);
};
