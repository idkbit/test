import { useMutation } from "@apollo/client";
import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LOG_IN, LOG_IN_DATA, LOG_IN_INPUT } from "../../graphql";
import { Site } from "../../graphql/types";

interface Props {
  setSites: (sites: Site[]) => void;
  setIsAuthorized: (authorized: boolean) => void;
}

export const LoginForm = ({ setIsAuthorized }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error, data }] = useMutation<
    LOG_IN_DATA,
    LOG_IN_INPUT
  >(LOG_IN, {
    onCompleted: (data) => {
      localStorage.setItem("accessToken", data.users.login.token.accessToken);
      setIsAuthorized(true);
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

  if (data) {
    return <Navigate to="/sites" replace />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <label htmlFor="email">email: </label>
        <input
          className="bg-input p-2 text-bgDark"
          type="email"
          name="email"
          id="email"
          placeholder="user@example.com"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="flex justify-between items-end">
        <label htmlFor="pw">password: </label>
        <input
          className="bg-input p-2 text-bgDark"
          type="password"
          name="pw"
          id="pw"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <button
        type="submit"
        className="bg-bgDark active:translate-y-1 transition-all py-2">
        Log in
      </button>
    </form>
  );
};
