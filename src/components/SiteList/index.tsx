import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FETCH_DATA, FETCH_SITES } from "../../graphql/queries";

interface Props {
  isAuthorized: string;
}

export const SiteList = ({ isAuthorized }: Props) => {
  const { data, loading, error } = useQuery<FETCH_DATA>(FETCH_SITES, {
    onError: (error) => {
      if (error.message === "INVALID_TOKEN") {
      }
    },
  });
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  if (data) {
    return (
      <>
        <div className="flex gap-4">
          {data.viewer.sites.map((site) => (
            <a
              className="border-2 focus:outline-none active:translate-y-1"
              key={site.id}
              href={`https://${site.host}`}
              target="_blank"
              rel="noopener noreferrer">
              {site.host}
            </a>
          ))}
        </div>
      </>
    );
  }

  return null;
};
