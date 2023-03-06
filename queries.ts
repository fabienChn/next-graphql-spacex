import { gql } from "apollo-boost";

const getLaunchesQuery = gql`
  query GetLaunchesQuery($sort: String, $order: String, $offset: Int, $limit: Int) {
    launches(sort: $sort, order: $order, offset: $offset, limit: $limit) {
      id
      launch_date_local
      mission_name
    }
  }
`;

const getLaunchQuery = gql`
  query GetLaunchQuery($launchId: ID!) {
    launch(id: $launchId) {
      id
      details
      is_tentative
      launch_date_local
      launch_site {
        site_id
        site_name
      }
      launch_success
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`

export {
  getLaunchesQuery,
  getLaunchQuery,
}