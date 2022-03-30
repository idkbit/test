import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, LoginForm, SiteList } from "./components";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(() => ({
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  }));
  const [theme, setTheme] = useState(() => {
    const inLocalStorage = localStorage.getItem("theme");

    if (inLocalStorage) {
      return inLocalStorage;
    }
    if (window.matchMedia("prefers-color-scheme: dark").matches) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    return localStorage.getItem("theme") || "light";
  });

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="wrapper">
        <BrowserRouter>
          <Header
            refreshToken={isAuthorized.refreshToken}
            isAuthorized={isAuthorized.accessToken}
            currentTheme={theme}
            setIsAuthorized={setIsAuthorized}
            toggleTheme={setTheme}
          />
          <Routes>
            <Route
              path="/"
              element={
                <LoginForm
                  setIsAuthorized={setIsAuthorized}
                  isAuthorized={isAuthorized.accessToken}
                />
              }
            />
            <Route
              path="/sites"
              element={<SiteList isAuthorized={isAuthorized.accessToken} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
