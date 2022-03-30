import { gql } from "@apollo/client";

export interface REFRESH_TOKEN_DATA {
  users: {
    refresh: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface REFRESH_TOKEN_INPUT {
  refreshToken: string;
}

export const REFRESH_TOKEN = gql`
  mutation REFRESH_TOKEN($refreshToken: String!) {
    users {
      refresh(refreshToken: $refreshToken) {
        accessToken
        refreshToken
      }
    }
  }
`;
