import React from "react";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_DATA, FETCH_SITES } from "../../graphql/queries";
import {
  REFRESH_TOKEN,
  REFRESH_TOKEN_DATA,
  REFRESH_TOKEN_INPUT,
} from "../../graphql";

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

export const SiteList = ({
  isAuthorized,
  refreshToken,
  setIsAuthorized,
}: Props) => {
  const { data, loading, refetch } = useQuery<FETCH_DATA>(FETCH_SITES, {
    onError: async (err) => {
      if (err.message === "INVALID_TOKEN" && refreshToken) {
        await refresh();
      }
    },
  });
  const [refresh, { loading: refreshLoading }] = useMutation<
    REFRESH_TOKEN_DATA,
    REFRESH_TOKEN_INPUT
  >(REFRESH_TOKEN, {
    variables: {
      refreshToken,
    },
    onCompleted: (refetchedData) => {
      const { accessToken, refreshToken } = refetchedData.users.refresh;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setIsAuthorized({ accessToken, refreshToken });
      refetch();
    },
  });

  if (loading || refreshLoading) {
    return <div className="ml-10">Loading...</div>;
  }

  if (!isAuthorized && !refreshToken) {
    return <Navigate to="/" replace />;
  }

  if (data) {
    return (
      <table className="w-1/4 ml-10 border-collapse border-2 border-slate-700 dark:border-slate-200">
        <thead className="border-b border-b-slate-700 dark:border-b-slate-200">
          <tr>
            <th className="border-r border-slate-700 dark:border-slate-200 px-4">
              #
            </th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {data.viewer.sites.map((site, i) => {
            return (
              <tr
                key={site.id}
                className="border-b border-b-slate-700 dark:border-b-slate-200">
                <td className="border-r border-r-slate-700 dark:border-r-slate-200 text-center">
                  {i + 1}
                </td>
                <td className="px-4">
                  <a
                    className="visited:text-purple-600 text-slate-700 dark:text-white hover:text-blue-500 hover:dark:text-blue-500"
                    href={`https://${site.host}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {site.host}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return null;
};
