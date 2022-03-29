import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm, SiteList } from "./components";
import { Site } from "./graphql/types";

function App() {
  const [sites, setSites] = useState<Site[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                setSites={setSites}
                setIsAuthorized={setIsAuthorized}
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
