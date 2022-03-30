import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOG_OUT, LOG_OUT_DATA, LOG_OUT_INPUT } from "../../graphql";

interface Props {
  isAuthorized: string;
  refreshToken: string;
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
  setIsAuthorized,
}: Props) => {
  const navigate = useNavigate();
  const [logout, { error }] = useMutation<LOG_OUT_DATA, LOG_OUT_INPUT>(
    LOG_OUT,
    {
      variables: {
        refreshToken,
      },
      onError: (error) => console.log(error.message),
      onCompleted: () => {
        console.log("good");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthorized({ accessToken: "", refreshToken: "" });
      },
    }
  );

  return (
    <header className="px-10 py-4 border-b-2 border-b-bgDark mb-10 flex justify-between items-baseline">
      <h1>Tsarka test</h1>
      {isAuthorized ? (
        <button
          onClick={() => logout()}
          className="bg-bgDark border-2 border-transparent px-4 py-2 hover:bg-bgLighter hover:text-bgDark hover:border-bgDark">
          Log out
        </button>
      ) : null}
    </header>
  );
};
