import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return { repositories: null, loading: true };
  }

  if (error) {
    return { repositories: null, loading: false, error };
  }

  return { repositories: data.repositories, loading: false };
};

export default useRepositories;
