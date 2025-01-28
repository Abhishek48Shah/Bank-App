import { createContext, useState, useContext } from "react";
interface AuthContextType {
  signup: (userData: any) => Promise<any>;
  login: (userData: any) => Promise<any>;
  isError: string | null;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }) => {
  const [isError, setIsError] = useState(null);
  const signup = async (userData: any): Promise<any> => {
    try {
      setIsError(null);
      const response = await fetch(
        "http://localhost/college_project/signup.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("jwt_token", data.token);
      }
      return data;
    } catch (error: any) {
      setIsError(error.message);
    }
  };
  const login = async (userData: any): Promise<any> => {
    console.log(userData);
    try {
      setIsError(null);
      const response = await fetch(
        "http://localhost/college_project/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      console.log(data);
      if (data.success && data.token) {
        localStorage.setItem("jwt_token", data.token);
      }
      return data;
    } catch (error: any) {
      console.log(error);
      setIsError(error.message);

    }
  };
  return (
    <AuthContext.Provider value={{ signup, login, isError }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
