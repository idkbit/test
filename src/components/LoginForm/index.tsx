import { useMutation } from "@apollo/client";
import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LOG_IN, LOG_IN_DATA, LOG_IN_INPUT } from "../../graphql";

interface Props {
  setIsAuthorized: (authorized: string | null) => void;
  isAuthorized: string | null;
}

export const LoginForm = ({ setIsAuthorized, isAuthorized }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error, data }] = useMutation<
    LOG_IN_DATA,
    LOG_IN_INPUT
  >(LOG_IN, {
    onCompleted: (data) => {
      const token = data.users.login.token.accessToken;
      localStorage.setItem("accessToken", token);
      setIsAuthorized(token);
    },
    onError: (error) => {
      localStorage.removeItem("accessToken");
      setIsAuthorized(null);
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
      className="flex flex-col gap-4 border-2 border-bgDark pt-4 w-1/2 mx-auto">
      <div className="border-b-2 border-b-bgDark flex flex-col justify-between">
        <label htmlFor="email" className="mx-4 mb-2">
          email:{" "}
        </label>
        <input
          className="bg-input p-2 text-bgDark mx-4 mb-4"
          type="email"
          name="email"
          id="email"
          placeholder="user@example.com"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="flex justify-between flex-col">
        <label htmlFor="pw" className="mx-4 mb-2">
          password:{" "}
        </label>
        <input
          className="bg-input p-2 text-bgDark mx-4"
          type="password"
          name="pw"
          id="pw"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <button
        type="submit"
        className="bg-bgDark transition-all active:translate-y-1 py-2 hover:bg-input hover:text-bgDark">
        Log in
      </button>
    </form>
  );
};
