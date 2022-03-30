import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, LoginForm, SiteList } from "./components";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(() => ({
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  }));

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header
          refreshToken={isAuthorized.refreshToken}
          isAuthorized={isAuthorized.accessToken}
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
  );
}

export default App;
