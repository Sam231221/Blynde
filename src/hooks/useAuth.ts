import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/reducers/AuthSlice";
import { RootState, User } from "../types";
import { loginUser, registerUser, resetPasswordForUser } from "../lib/authApi";

export const useLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      dispatch(setUser(user as User));
      queryClient.setQueryData(["user"], user);
    },
  });
};

export const usePasswordReset = () => {
  return useMutation({
    mutationFn: resetPasswordForUser,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
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
