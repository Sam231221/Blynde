//In useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  logout,
  setUser,
} from "../redux/reducers/AuthSlice";
import { RootState, User } from "../types";

export const useLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Create a wrapper function to return a promise
  const loginMutation = (userData: { username: string; password: string }) => {
    return new Promise<User>((resolve, reject) => {
      dispatch(loginUser(userData))
        .then((action) => {
          if (action.type.endsWith("fulfilled")) {
            resolve(action.payload); // Return the user data on success
          } else {
            reject(new Error(action.payload as string)); // Reject with error if not fulfilled
          }
          console.log("Login success:", action);
        })
        .catch((error) => {
          console.error("Login failed:", error);
          reject(error);
        });
    });
  };

  return useMutation({
    //converting loginUser into promise
    //accepts a promise(axios, fetch)
    mutationFn: loginMutation, // Use the wrapper function
    onSuccess: (data) => {
      dispatch(setUser(data));
      // Handle success - set user data to queryClient
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("Login failed:", error);
    },
  });
};

// Register hook
export const useRegister = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Create a wrapper function to return a promise for the register action
  const registerMutation = (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    return new Promise<User>((resolve, reject) => {
      dispatch(registerUser(userData))
        .then((action) => {
          if (action.type.endsWith("fulfilled")) {
            resolve(action.payload); // Return the user data on success
          } else {
            reject(new Error(action.payload as string)); // Reject with error if not fulfilled
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return useMutation({
    mutationFn: registerMutation, // Use the wrapper function
    onSuccess: (data) => {
      dispatch(setUser(data));
      // Handle success - set user data to queryClient
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("Registration failed:", error);
    },
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
