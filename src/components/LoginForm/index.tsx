import { useMutation } from "@apollo/client";
import React, { FormEvent, ChangeEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { LOG_IN, LOG_IN_DATA, LOG_IN_INPUT } from "../../graphql";

interface Args {
  accessToken: string;
  refreshToken: string;
}

interface Props {
  setIsAuthorized: ({ accessToken, refreshToken }: Args) => void;
  isAuthorized: string;
}

export const LoginForm = ({ setIsAuthorized, isAuthorized }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error, data }] = useMutation<
    LOG_IN_DATA,
    LOG_IN_INPUT
  >(LOG_IN, {
    onCompleted: (data) => {
      const { accessToken, refreshToken } = data.users.login.token;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setIsAuthorized({ accessToken, refreshToken });
    },
    onError: (error) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsAuthorized({ accessToken: "", refreshToken: "" });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      variables: {
        email,
        password,
      },
    });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (isAuthorized) {
    return <Navigate to="/sites" replace />;
  }

  if (data) {
    return <Navigate to="/sites" replace />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border-2 border-slate-700 dark:border-slate-200 pt-4 w-1/4 mx-auto">
      <div className="border-b-2 dark:border-b-slate-200 border-b-slate-700 flex flex-col justify-between">
        <label htmlFor="email" className="mx-4 mb-2">
          email:{" "}
        </label>
        <input
          className="bg-white p-2 text-slate-700  mx-4 mb-4 placeholder:text-slate-400"
          type="email"
          name="email"
          id="email"
          placeholder="user@example.com"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="flex justify-between flex-col">
        {email && !password ? (
          <span className="mx-4 text-red-600">password is required</span>
        ) : (
          <span className="mx-4 invisible" aria-hidden="true">
            just for space
          </span>
        )}
        <label htmlFor="pw" className="mx-4 mb-2">
          password:{" "}
        </label>
        <input
          className="bg-white p-2 text-slate-700 mx-4 placeholder:text-slate-400"
          type="password"
          name="pw"
          id="pw"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <button
        type="submit"
        className="bg-slate-700 text-slate-200 dark:bg-slate-200 dark:text-slate-700 transition-all active:translate-y-1 py-2 hover:bg-input hover:text-bgDark">
        Log in
      </button>
    </form>
  );
};
