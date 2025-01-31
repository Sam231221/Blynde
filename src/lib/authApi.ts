import { User } from "../types";

const API_URL = "http://127.0.0.1:8000/api/users";

export const loginUser = async (userData: {
  username: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data: User = await response.json();
  return data;
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  const data: User = await response.json();
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem("userInfo");
};
