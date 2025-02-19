//In useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/reducers/AuthSlice";
import { RootState } from "../types";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPasswordForUser,
} from "../lib/authApi";

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
    onSuccess: (user) => {
      dispatch(setUser(user));
      queryClient.setQueryData(["user"], user);
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (response) => {
      if (response === 204) {
        dispatch(logout());
        queryClient.removeQueries({ queryKey: ["user"] });
      }
    },
  });
};

export const useUser = () => {
  return useSelector((state: RootState) => state.auth.userInfo);
};
