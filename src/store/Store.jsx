import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const StoreProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAuthenticated: false,
    firstTime: false,
  });
  const [start, setStart] = useState(false);

  const changeThemeColor = (color) => {
    setThemeColor(color);
  };

  useEffect(() => {
    // Check if user data exists in local storage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userName, pass) => {
    // Simulate user login
    if (userName === "karthik" && pass === "admin") {
      setUser({
        name: userName,
        email: `${userName}@gmail.com`,
        isAuthenticated: true,
        firstTime: true,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: userName,
          email: `${userName}@gmail.com`,
          isAuthenticated: true,
          firstTime: true,
        })
      );
      const from = location.state?.from || "/chat";
      navigate(from);
    } else {
      alert("Invalid Credential");
    }
  };

  const logout = () => {
    setUser({ name: "", email: "", isAuthenticated: false, firstTime: false });

    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        themeColor,
        changeThemeColor,
        user,
        setUser,
        login,
        logout,
        start,
        setStart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => useContext(AppContext);
