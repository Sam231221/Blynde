import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { apiRequest, RequestBody } from "./axiosClient";
import { User } from "../types";
export const useUsersQuery = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => apiRequest({ url: "/api/users/", method: "GET" }),
    staleTime: Infinity, // Data will not be refetched if the query is considered fresh, even if the query is not active.
  });
export const useUserDetailQuery = (userId: number) =>
  useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      apiRequest({
        url: `/api/users/detail/${userId}/`,
        method: "GET",
        requiresToken: true,
      }),

    enabled: !!userId, // Only run the query if userId is provided
    staleTime: Infinity,
  });
export const useCreateUserMutation = () => {
  return useMutation<void, Error, RequestBody>({
    mutationFn: (userData: RequestBody) =>
      apiRequest({
        url: "/api/users/create/",
        method: "POST",
        data: userData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
};

export const useUpdateUserMutation = () => {
  return useMutation<void, Error, RequestBody>({
    mutationFn: (userId) =>
      apiRequest({
        url: `/api/users/update/${userId}/`,
        method: "PUT",
        data: userId,
      }),
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
      apiRequest({
        url: `/api/users/delete/${id}/`,
        method: "DELETE",
      }),
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
  return useMutation<void, Error, RequestBody>({
    mutationFn: (formData: RequestBody) =>
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
