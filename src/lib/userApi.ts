import { useQuery, useMutation } from "@tanstack/react-query";
import store from "../redux/store";
import apiClient, { AxiosRequestConfig } from "./api";
import { queryClient } from "./queryClient";

export const apiRequest = async (
  url: string,
  method: string = "GET",
  body: any = null
) => {
  const token = store.getState().auth.userInfo?.token; // Get token from Redux store

  const headers: { "Content-Type": string; Authorization?: string } = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: AxiosRequestConfig = {
    method: method,
    url: url,
    headers: headers,
  };

  if (body) {
    config.data = body; // Use 'data' for the request body in axios
  }
  const response = await apiClient(config);
  return response.data;
};
// React Query Hooks (for data fetching and mutations) - Recommended approach
export const useUsersQuery = () =>
  useQuery({
    queryKey: ["users"], // Important: query key for caching and invalidation
    queryFn: () => apiRequest("/api/users/list/"),
    // ... other options like enabled, refetchOnMount, etc.
    staleTime: Infinity, // Data will not be refetched if the query is considered fresh, even if the query is not active.
  });
export const useUserDetailQuery = (userId: number) =>
  useQuery({
    queryKey: ["user", userId], // Important: query key for caching and invalidation
    queryFn: () => apiRequest(`/api/users/${userId}/`),
    // ... other options like enabled, refetchOnMount, etc.
    enabled: !!userId, // Only run the query if userId is provided
    staleTime: Infinity, // Data will not be refetched if the query is considered fresh, even if the query is not active.
  });

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (userData) =>
      apiRequest("/api/users/create/", "POST", userData),
    onSuccess: (data) => {
      console.log(data);
      // Invalidate the users query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Use queryClient if you have it available
      // Or refetch the query manually if you're in the component where useUsersQuery is used.
    },
    onError: (error) => {
      console.error("Error creating user:", error); // Handle errors appropriately (e.g., display message to user)
      // ...other error handling logic (e.g. display error message to user)
    },
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (user) =>
      apiRequest(`/api/users/update/${user.id}/`, "PUT", user),
    onSuccess: (dat) => {
      console.log("da:", dat);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error); // Handle errors appropriately (e.g., display message to user)
      // ...other error handling logic (e.g. display error message to user)
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
      console.error("Error deleting user:", error); // Handle errors appropriately (e.g., display message to user)
      // ...other error handling logic (e.g. display error message to user)
    },
  });
};

// Profile Update (example)
export const useGetUserProfileQuery = () => {
  return useQuery({
    queryKey: ["profile"], // Important: query key for caching and invalidation
    queryFn: () => apiRequest("/api/users/profile/"), // Adjust endpoint as needed
    staleTime: Infinity, // Data will not be refetched if the query is considered fresh, even if the query is not active.
  });
};

// Profile Update (example)
export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (userData) =>
      apiRequest("/api/users/profile/", "PUT", userData), // Adjust endpoint as needed
    onSuccess: (data) => {
      // Handle successful profile update (e.g., update user data in Redux or local storage)

      console.log("Profile updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error); // Handle errors appropriately (e.g., display message to user)
      // ...other error handling logic (e.g. display error message to user)
    },
  });
};
