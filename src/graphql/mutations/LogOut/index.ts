import { gql } from "@apollo/client";

export interface LOG_OUT_DATA {
  logout: boolean;
}

export interface LOG_OUT_INPUT {
  refreshToken: string;
}

export const LOG_OUT = gql`
  mutation LOG_OUT($refreshToken: String!) {
    users {
      logout(refreshToken: $refreshToken)
    }
  }
`;
