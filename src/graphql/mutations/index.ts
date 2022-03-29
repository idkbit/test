import { gql } from "@apollo/client";

import { Site } from "../types";

export interface LOG_IN_INPUT {
  email: string;
  password: string;
}

export interface LOG_IN_DATA {
  users: {
    login: {
      token: {
        accessToken: string;
        refreshToken: string;
      };
      viewer: {
        id: string;
        email: string;
        sites: Site[];
      };
    };
  };
}

export const LOG_IN = gql`
  mutation LOG_IN($email: String!, $password: String!) {
    users {
      login(input: { email: $email, password: $password }) {
        viewer {
          id
          email
          sites {
            id
            host
          }
        }
        token {
          accessToken
          refreshToken
        }
      }
    }
  }
`;
