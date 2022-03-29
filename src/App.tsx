import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, LoginForm, SiteList } from "./components";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(() =>
    localStorage.getItem("accessToken")
  );

  return (
    <div className="wrapper">
      <Header isAuthorized={isAuthorized} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                setIsAuthorized={setIsAuthorized}
                isAuthorized={isAuthorized}
              />
            }
          />
          <Route
            path="/sites"
            element={<SiteList isAuthorized={isAuthorized} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
