import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../axios/queryClient";
import { apiRequest, RequestBody } from "../axios/axiosClient";
import { User } from "../../types";

export const useUsersQuery = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => apiRequest({ url: "/api/users/", method: "GET" }),
    staleTime: Infinity,
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

    enabled: !!userId,
    staleTime: Infinity,
  });

export const useCreateUserMutation = () => {
  return useMutation<void, Error, RequestBody>({
    mutationFn: async (userData: RequestBody) => {
      await apiRequest({
        url: "/api/users/create/",
        method: "POST",
        data: userData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (userId) =>
      apiRequest({
        url: `/api/users/update/${userId}/`,
        method: "PUT",
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
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await apiRequest({
        url: "/api/users/profile/",
        method: "GET",
        requiresToken: true,
      });
      return (data as User) || {};
    },
    staleTime: Infinity,
  });
};

export const useUpdateProfileMutation = () => {
  return useMutation<void, Error, RequestBody>({
    mutationFn: async (formData: RequestBody) => {
      await apiRequest({
        url: "/api/users/profile/",
        method: "PUT",
        data: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
};
