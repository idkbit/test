import React from "react";

interface Props {
  isAuthorized: string | null;
}

export const Header = ({ isAuthorized }: Props) => {
  return (
    <header className="px-10 py-4 border-b-2 border-b-bgDark mb-10 flex justify-between items-baseline">
      <h1>Tsarka test</h1>
      {isAuthorized ? (
        <button className="bg-bgDark border-2 border-transparent px-4 py-2 hover:bg-bgLighter hover:text-bgDark hover:border-bgDark">
          Log out
        </button>
      ) : null}
    </header>
  );
};
