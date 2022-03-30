import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOG_OUT, LOG_OUT_DATA, LOG_OUT_INPUT } from "../../graphql";

interface Props {
  isAuthorized: string;
  refreshToken: string;
  currentTheme: string;
  toggleTheme: (isDark: string) => void;
  setIsAuthorized: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => void;
}

export const Header = ({
  isAuthorized,
  refreshToken,
  toggleTheme,
  currentTheme,
  setIsAuthorized,
}: Props) => {
  const [logout, { client }] = useMutation<LOG_OUT_DATA, LOG_OUT_INPUT>(
    LOG_OUT,
    {
      variables: {
        refreshToken,
      },
      onError: (error) => console.log(error.message),
      onCompleted: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthorized({ accessToken: "", refreshToken: "" });
      },
    }
  );

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return (
    <header className="px-10 py-4 border-b-2 border-b-slate-700 dark:border-b-slate-200 mb-10 flex justify-between items-baseline">
      <h1 className="text-slate-700 dark:text-slate-200 text-xl font-bold">
        Tsarka test
      </h1>
      <div>
        <button
          onClick={() =>
            toggleTheme(currentTheme === "dark" ? "light" : "dark")
          }
          className="button mr-4">
          {currentTheme === "dark" ? "light" : "dark"} mode
        </button>
        {isAuthorized ? (
          <button
            onClick={() => logout({ onCompleted: () => {} })}
            className="button">
            Log out
          </button>
        ) : null}
      </div>
    </header>
  );
};
