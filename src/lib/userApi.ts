import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { apiRequest } from "./api";
import { User } from "../types";
import store from "../redux/store";
const token = store.getState().auth.userInfo?.token;

export const useUsersQuery = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => apiRequest("/api/users/list/"),

    staleTime: Infinity, // Data will not be refetched if the query is considered fresh, even if the query is not active.
  });
export const useUserDetailQuery = (userId: number) =>
  useQuery({
    queryKey: ["user", userId],
    queryFn: () => apiRequest(`/api/users/${userId}/`),

    enabled: !!userId, // Only run the query if userId is provided
    staleTime: Infinity,
  });
interface CreateUserFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  profile_pic: string;
}

export const useCreateUserMutation = () => {
  return useMutation<void, Error, CreateUserFormData>({
    mutationFn: (userData: CreateUserFormData) =>
      apiRequest("/api/users/create/", "POST", userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
};

interface UpdateUserFormData {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
  profile_pic?: string;
  avatarFile?: File | null;
}

export const useUpdateUserMutation = () => {
  return useMutation<void, Error, UpdateUserFormData>({
    mutationFn: (user: UpdateUserFormData) =>
      apiRequest(`/api/users/update/${user.id}/`, "PUT", user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
};

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/users/delete/${id}/`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
};

export const useGetUserProfileQuery = () => {
  return useQuery<User>({
    queryKey: ["profile"],
    queryFn: () =>
      apiRequest({
        url: "/api/users/profile/", // Adjust to your Django backend endpoint
        method: "GET",
        requiresToken: true,
      }),
    staleTime: Infinity,
  });
};

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (formData) =>
      apiRequest({
        url: "/api/users/profile/", // Adjust to your Django backend endpoint
        method: "PUT",
        data: formData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
};
