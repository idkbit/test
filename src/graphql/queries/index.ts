import { gql } from "@apollo/client";
import { Site } from "../types";

export interface FETCH_DATA {
  viewer: {
    id: string;
    email: string;
    sites: Site[];
  };
}

export const FETCH_SITES = gql`
  query fetchSites {
    viewer {
      id
      email
      sites {
        host
        id
      }
    }
  }
`;
